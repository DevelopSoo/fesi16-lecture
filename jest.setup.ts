// 브라우저 환경에서도 테스트 코드 작성할 수 있게 도와주는 놈
// 테스트 코드가 실행되기 전에 세팅
import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";

// 모든 테스트가 실행되기 전에 MSW 서버를 실행한다.
beforeAll(() => server.listen());
// 모킹한 걸 초기화한다.
afterEach(() => server.resetHandlers());
// 테스트가 다 끝나면 MSW 서버를 종료한다.
afterAll(() => server.close());
