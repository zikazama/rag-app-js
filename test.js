import { RAGApplicationBuilder } from '@llm-tools/embedjs';
import { Ollama } from '@llm-tools/embedjs';
import { MongoDb } from '@llm-tools/embedjs/vectorDb/mongodb';
import { TextLoader } from '@llm-tools/embedjs';

// Konfigurasi Ollama
const ollamaBaseUrl = 'http://localhost:11434';
const ollamaModelName = 'llama3.1';

// Konfigurasi MongoDB
const mongoConnectionString = 'mongodb://localhost:27017';
const mongoDbName = 'embedjs';
const mongoCollectionName = 'embeddings';

// Buat instansi RAGApplicationBuilder
const ragApplicationBuilder = await new RAGApplicationBuilder()
  .setModel(new Ollama({ baseUrl: ollamaBaseUrl, modelName: ollamaModelName }))
  .setVectorDb(new MongoDb({
    connectionString: mongoConnectionString,
    dbName: mongoDbName,
    collectionName: mongoCollectionName,
  }))
  .build();

// Tambahkan loader untuk data yang ingin diembed
ragApplicationBuilder.addLoader(new TextLoader({ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }));

// Jalankan query menggunakan RAG
const response = await ragApplicationBuilder.query('Apa itu lorem ipsum?');
console.log(response);