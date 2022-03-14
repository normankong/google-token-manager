# google-token-manager
Google Token Manager

Purpose : A lightweight API to refresh access token

# Usage : 
Header : ```Content-Type : application/json```
Body : 
```
{
    "credentials": {
        "installed": {
            "client_id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "project_id": "XXXXXXXXX",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "redirect_uris": [
                "urn:ietf:wg:oauth:2.0:oob",
                "http://localhost"
            ]
        }
    },
    "token": {
        "access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "refresh_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "scope": "https://www.googleapis.com/auth/spreadsheets.readonly",
        "token_type": "Bearer",
        "expiry_date": 1647214465050
    }
}
```

# Development
To Run within google cloud function framework
```
npx @google-cloud/functions-framework --target=refreshToken
```

# Deployment
Application can be deployed either by Cloud Function or Cloud Run. For additional information, please refer to the below link

- [Google Build Pack](https://github.com/GoogleCloudPlatform/buildpacks)
- [Medium on Build Pack](https://medium.com/google-cloud/cloud-function-buildpacks-ebba8e5e382)

Most of the deployment have been added in the package.json.

## To Deploy to GCP Cloud Function
```
gcloud functions deploy google-token-manager --runtime nodejs16 --entry-point refreshToken --allow-unauthenticated --trigger-http
```

# To build docker image
To build the Docker image, it is required to use "pack" to perform the containerization. 
```
brew install buildpacks/tap/pack
```

```bash
pack build \
--builder gcr.io/buildpacks/builder:v1 \
--env GOOGLE_FUNCTION_SIGNATURE_TYPE=http \
--env GOOGLE_FUNCTION_TARGET=refreshToken \
 google-token-manager
```

# To Run Docker Locally
After create the docker image, run the command to start the docker locally
```
docker run --rm -p 8080:8080 google-token-manager
```

# To Deploy to GCP Cloud Run
GCP may create new source repository for first execution
```
gcloud run deploy google-token-manager --platform=managed --allow-unauthenticated --region=us-west1 --source=.
```
