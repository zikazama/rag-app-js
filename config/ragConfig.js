import { OllamaEmbeddings, RAGApplicationBuilder } from "@llm-tools/embedjs";
import { MongoDb } from "@llm-tools/embedjs/vectorDb/mongodb";
import { Ollama } from "@llm-tools/embedjs";

const init = async () => {
  try {
    const ragApplication = await new RAGApplicationBuilder()
      // .setEmbeddingModel(
      //   new OllamaEmbeddings({
      //     modelName: "llama3.1",
      //     baseUrl: "http://localhost:11434",
      //   })
      // )
      .setModel(
        new Ollama({
          modelName: 'llama3.1',
          baseUrl: "http://localhost:11434",
        })
      )
      .setVectorDb(
        new MongoDb({
          connectionString: "mongodb://localhost:27017/ragApp",
        })
      )
      .build();
    return ragApplication;
  } catch (error) {
    console.log(error);
  }
};

const rag = init();

export default rag;
