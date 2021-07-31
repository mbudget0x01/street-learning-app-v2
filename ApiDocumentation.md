# API Documentation

This document gives an overview over the api (WIP).

If no specified otherwise only `GET` requests are supported.

## Files

- `/descriptor` returns the descriptor file.
- `/streets/<file-name.json>` returns the street file.

## Geocoding

- `/geocode/nominatim` requests a lookup via Nominatim and returns its response, just proxy.
  - Accepts `PUT` and `POST` requests.
  - needs following body: `lat:"123.456", lng:"123.456"`
- `/geocode/overpass` queries the overpass api use following schema: `/geocode/overpass/<FileName>/<overpassAreaID>/<streetName>`
  - The `FileName` is required for caching
- `/geocode/proxy/overpass` proxies just the url, will be removed soon.
