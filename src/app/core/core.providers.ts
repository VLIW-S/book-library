import { IBOOK_SERVICE_TOKEN } from "./models/ibook-service.interface";
import { InMemoryBookService } from "./services/library/in-memory-book.service";

export const CORE_PROVIDERS = [
  { provide: IBOOK_SERVICE_TOKEN, useClass: InMemoryBookService }, // HttpBookService for real backend
];