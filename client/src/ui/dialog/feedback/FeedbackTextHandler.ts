export class FeedbackTextHandler{
    
    private static uri:string = "/feedback/text/"

    private static instance:FeedbackTextHandler | null;
    //singleton
    private constructor(){}

    private positiveAnswers:IFeedbackText[] =[]
    private negativeAnswers:IFeedbackText[] =[]
    
    /**
     * Instance of the Text Handler
     * @returns The instance on the instanciation some data needs to be fetched from the server, so it is async
     */
    public static async getInstance():Promise<FeedbackTextHandler>{
        if(this.instance == null){
            this.instance = new FeedbackTextHandler()
            let rawList = await this.instance.fetchData()
            this.instance.populateData(rawList)
        }
        return this.instance
    }

    /**
     * Fetches the data from the server containing the Feedback texts
     * @returns Unsorted List of all feedbackTexts
     */
    private async fetchData():Promise<IFeedbackText[]>{
        const response = await fetch(FeedbackTextHandler.uri)
        const data = await response.json()
        return data
    }

    /**
     * Populates the arrays containing the sorted Texts
     * @param rawList unsorted List
     */
    private populateData(rawList:IFeedbackText[]){
        rawList.forEach(element => {
            if(element.correct){
                this.positiveAnswers.push(element)
            } else{
                this.negativeAnswers.push(element)
            }
        });
    }

    /**
     * Get a random positive feedback Text
     * @returns a Feedback Text
     */
    public getPositivFeedbackText():IFeedbackText{
        return this.getRandomMember(this.positiveAnswers)
    }

    
    /**
     * Get a random negative feedback Text
     * @returns a Feedback Text
     */
    public getNegativFeedbackText():IFeedbackText{
        return this.getRandomMember(this.negativeAnswers)
    }

    /**
     * Helper function returns a random member from a array
     * @param list array to choose from
     * @returns a random member
     */
    private getRandomMember(list:IFeedbackText[]):IFeedbackText{
        return list[Math.floor(Math.random() * list.length)];
    }
}

/**
 * Interface representing the data comming from the server
 */
export interface IFeedbackText{
    /**
     * If is feedback for correct answer
     */
    correct: boolean,
    /**
     * The Text to display
     */
    text: string,
    /**
     * Indicating if the text is a quote
     */
    isQuote: boolean,
    /**
     * Author of the quote, might not be present
     */
    quoteFrom: string | undefined
}