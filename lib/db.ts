import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/phcl';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose | null> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('✅ MongoDB Atlas connected successfully — Database: phcl');
      return mongooseInstance;
    }).catch((err) => {
      console.warn('❌ MongoDB Connection Failed. Using In-Memory Fallback:', err.message);
      cached!.promise = null; // Reset so next request retries
      return null as unknown as typeof mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch {
    cached!.conn = null;
    cached!.promise = null;
  }

  return cached!.conn;
}
