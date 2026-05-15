import dotenv from 'dotenv';
dotenv.config();

const config = {
    app:{
        port: parseInt(process.env.PORT as string, 10) || 3000,
        logLevel: process.env.LOG_LEVEL || "info"
    },
    db:{
        host: process.env.DB_HOST as string,
        port: parseInt(process.env.DB_PORT as string, 10),
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        name: process.env.DB_NAME as string,
        dbName: process.env.DB_NAME as string
    },
    courier:{
        httpTimeoutMs: parseInt(process.env.COURIER_HTTP_TIMEOUT_MS as string, 10) || 5000,
        retryMaxAttempts: parseInt(process.env.COURIER_RETRY_MAX_ATTEMPTS as string, 10) || 3,
        retryDelayMs: parseInt(process.env.COURIER_RETRY_DELAY_MS as string, 10) || 1000
    },
    urbanebolt:{
        clientId: process.env.URBANEBOLT_API_KEY as string,
        clientSecret: process.env.URBANEBOLT_API_SECRET as string,
        apiUrl: process.env.URBANEBOLT_API_URL as string,
    },
    bluedart:{
        clientId: process.env.BLUEDART_API_KEY as string,
        clientSecret: process.env.BLUEDART_API_SECRET as string,
        apiUrl: process.env.BLUEDART_API_URL as string,
    },
    retryConfig:{
        retries: parseInt(process.env.COURIER_RETRY_MAX_ATTEMPTS as string, 10) || 3,
        retryDelay: parseInt(process.env.COURIER_RETRY_DELAY_MS as string, 10) || 1000,
        authRetries: parseInt(process.env.COURIER_AUTH_RETRIES as string, 10) || 1,
    }
}
export default config;