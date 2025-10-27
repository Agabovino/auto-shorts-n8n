# Docker N8N and Next.js Template

This repository provides a Docker-based environment for running N8N and a Next.js frontend application.

## Included Tools

*   **N8N:** A free and open-source workflow automation tool.
*   **ffmpeg:** A complete, cross-platform solution to record, convert and stream audio and video.
*   **yt-dlp:** A command-line program to download videos from YouTube and other video sites.
*   **Next.js:** A React framework for building user interfaces.

## Getting Started

To get started, you need to have Docker and Docker Compose installed on your system.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/docker-w-n8n-template.git
    cd docker-w-n8n-template
    ```

2.  **Build and run the containers:**

    ```bash
    docker-compose up -d --build
    ```

3.  **Access the applications:**

    *   **N8N:** Open your web browser and navigate to `http://localhost:5678`.
    *   **Next.js Frontend:** Open your web browser and navigate to `http://localhost:3000`.

## Services

### N8N

The `n8n` service runs the N8N application. The `n8n_data` volume is used to persist N8N data, such as workflows and credentials, across container restarts.

### Frontend

The `frontend` service runs a Next.js application. It is configured to communicate with the `n8n` service.

## Development

To run the Next.js application in development mode, you can run the following command in the `frontend` directory:

```bash
npm run dev
```