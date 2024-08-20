import * as EmbedJs from "@llm-tools/embedjs";
import { MongoDb } from "@llm-tools/embedjs/vectorDb/mongodb";
import { OllamaEmbeddings } from "@llm-tools/embedjs";

const runRAG = async (filePath) => {
  try {
    // Inisialisasi RAG Application
    const ragApplication = await new EmbedJs.RAGApplicationBuilder()
      .setModel(
        new OllamaEmbeddings({
          modelName: "llama3.1",
          baseUrl: "http://localhost:11434",
        })
      )
      .setVectorDb(
        new MongoDb({
          connectionString: "mongodb://localhost:27017/ragApp",
        })
      )
      .addLoader(new EmbedJs.PdfLoader({ filePathOrUrl: filePath }))
      .build();

    // Menjalankan query menggunakan RAG
    const response = await ragApplication.query(
      "Beri saya ringkasan dokumen ini."
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default runRAG;
