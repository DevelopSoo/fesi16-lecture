import { setupServer } from "msw/node";
import { postsHandlers } from "./handlers/posts";

// 가짜 서버 만들어주는 객체
export const server = setupServer(...postsHandlers);
