## 1단게
```bash
# 노드 모듈 패키지 설치 방법 (.gitignore 해서 node_modules 푸시 안되게 설정)

npm init # node.js 가 설치되어 있어야 합니다.
npm install cypress --save-dev # 싸이프레스 설치
```


## 2단계 들어가기 전 (권한 이슈)
```bash

이슈1) .\node_modules\.bin\cypress : 이 시스템에서 스크립트를 실행할 수 없으므로
C:\nabi\node_modules\.bin\cypress.ps1 파일을 로드할 수 없습니다.

해결방법 (gpt)
PowerShell은 기본적으로 스크립트 실행을 제한하는 정책을 가지고 있으며,
이 정책이 설정되어 있을 경우 스크립트 파일을 실행할 수 없습니다.

1. PowerShell을 관리자 권한으로 실행합니다. 시작 메뉴에서 "PowerShell"을 검색하고
마우스 오른쪽 버튼을 클릭하여 "관리자 권한으로 실행"을 선택합니다.

2. PowerShell 실행 권한 정책을 변경합니다. 다음 명령어를 실행하여
현재 사용자의 실행 권한 정책을 변경합니다

3. Set-ExecutionPolicy RemoteSigned    // 파워셀 커멘드에 입력
```

## 2단계
```json
// package.json  파일문서에 들어가서 아래의 스크립트를 추가합니다.

"scripts": {
    "cy:open": "cypress open" //  명령어 추가 하셔야 합니다.
  },
```

## 3단계
```bash
npm run cy:open # IDE 터미널창에서 입력 -> cypress가 실행됩니다. 

1. Cypress 버츄어박스가 뜰텐데 E2E Testing 클릭 

2. 크롬 , 엣지 , 일렉트론 테스팅 환경에 맞게 선택합니다. (저는 크롬선택)

3. 테스팅할 파일명.cy.js 를 선택합니다.

4. 결과를 확인합니다.

5. IDE에서 코드 수정후 코드 저장버튼을(ctrl+s) 누른 즉시 Cypress창에 즉시 반영됩니다.

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

## 디렉토리 구조
```bash
1. cypress 폴더: 이 폴더는 Cypress 프로젝트의 루트 폴더입니다.

2. 테스트 파일: 실제 테스트 케이스가 포함된 파일입니다. 예를 들어,
"loginPage.cy.js" 또는 "signup.cy.js"와 같은 파일이 여기에 속합니다.

3. support 폴더: 보조 파일 및 사용자 지정 명령이 포함됩니다.

4. cypress.json: 이 파일은 Cypress 설정 파일로, 프로젝트의 Cypress 관련 설정을 구성하는 데 사용됩니다.
   여기에는 테스트 환경, 기본 URL 및 다양한 Cypress 옵션을 설정할 수 있습니다.

5. package.json: 이 파일은 Node.js 프로젝트에서 사용되는 표준 package.json 파일이며, 프로젝트의
   종속성 및 스크립트를 정의하는 데 사용됩니다. Cypress는 보통 개발 및 테스트 의존성으로 이 파일에 포함됩니다.

6. package-lock.json: 이 파일은 package.json 파일에 정의된 종속성의 정확한 버전 및
   의존성 트리를 보유하는 파일입니다.

   Node.js 패키지 관리자(NPM 또는 Yarn)에 의해 자동으로 생성됩니다.
```

![파일구조](https://github.com/KyeongSeopHam/cyElice/assets/43702182/c6c49290-a29c-41e0-b62b-8a3b0457ca4a)
