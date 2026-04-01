# MERN Workshop - Docker Setup

This project includes Docker configurations for both frontend and backend services.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository and navigate to the project directory**

2. **Build and run the entire stack:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - MongoDB: localhost:27017

## Services

### Backend
- **Port:** 8000
- **Environment:** Production
- **Health Check:** Available at `/api/health`
- **Database:** Connected to MongoDB service

### Frontend
- **Port:** 3000 (maps to container port 80)
- **Build:** Multi-stage build with Nginx
- **API Proxy:** Routes `/api/*` requests to backend service

### MongoDB
- **Port:** 27017
- **Database:** interns
- **Root User:** admin/password
- **Data Persistence:** Uses named volume `mongo_data`

## Development

### Build individual services:

```bash
# Build backend
docker build -t mern-backend ./backend

# Build frontend
docker build -t mern-frontend ./frontend
```

### Run services individually:

```bash
# Run backend only
docker run -p 8000:8000 --env-file ./backend/.env mern-backend

# Run frontend only
docker run -p 3000:80 mern-frontend
```

## Environment Variables

Make sure your `backend/.env` file contains:
- `JWT_SECRET`
- `MONGO_URI`

## Networking

All services are connected via `mern-network` bridge network, allowing them to communicate using service names as hostnames.

## Volumes

- `mongo_data`: Persists MongoDB data
- Environment file is mounted as read-only volume for security

## Production Considerations

1. **Environment Variables:** Use Docker secrets or external configuration management
2. **Database Credentials:** Change default MongoDB credentials
3. **SSL/TLS:** Configure SSL termination
4. **Logging:** Implement proper logging solutions
5. **Monitoring:** Add health checks and monitoring