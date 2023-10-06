## 1단게
```bash
npm init # node.js 가 설치되어 있어야 합니다.
npm install cypress --save-dev # 싸이프레스 설치
```

## 2단계
```json
// package.json

"scripts": {
    "cy:open": "cypress open" // 명령어 추가
  },
```

## 3단계
```bash
npm run cy:open # cypress open
```


## 4단게 
```js
// cypress.config.js 파일 생성 후 아래 코드 입력
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://accounts.elice.io/',
  },
})
```

## 커스텀 명령어 설정
```js
// support/commands.js
Cypress.Commands.add('login', (email, pw) => {
  // 실행시킬 동작
})

import '../../support/commands'
cy.login('이메일주소', '비밀번호')  // 이미 테스트계정만들어놓았음
```

## beforeEach
```js
describe('', () => {
  beforeEach(() => {
    // 테스트마다 반복시키고 싶은 동작 설정
  })
})
```