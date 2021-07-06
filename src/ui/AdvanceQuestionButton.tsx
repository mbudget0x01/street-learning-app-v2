import { Button } from "@material-ui/core"





interface Props {
    onClickHandler: () => void,
    isDisabled: boolean,
}

export const AdvanceQuestionButton = (props: Props) => {

    return (
            <Button variant="contained" color="primary" disabled={props.isDisabled} onClick={props.onClickHandler}>
                Next Question
            </Button>
    )
}