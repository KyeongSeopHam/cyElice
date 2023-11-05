import '../../support/commands'

function generateRandomUsername() {
  const randomPart = Math.floor(Math.random() * 10000); // 난수로 회원가입 계정 반복
  return `rudtjq${randomPart}@naverr.com`;
}

//회원가입 페이지 테스트.

describe('회원가입이 정상적으로 되어야 한다.', () => {
  beforeEach(() => {
    cy.setCookie('lang', 'ko');
    cy.visit('/')
    cy.clearCookie('eliceSessionKey')
    cy.url().should('include', '/accounts/signin')
    cy.get('select[aria-label="Change Languages"]').select('ko');
    cy.get('.e1t19hrb1 > .MuiTypography-root').click();    //  회원가입 클릭
  })

  it('회원 가입 페이지 로드, 기본 요소 랜더딩 확인 [체크박스 상태별 노출 확인] ', () => {

    // 체크박스 선택 및 해제 확인


    // 만 14세 이상 체크박스
    cy.get('input[name="adult"]').click();
    cy.get('input[name="adult"]').should('be.checked');
    cy.get('input[name="adult"]').click();
    cy.get('input[name="adult"]').should('not.be.checked');

    // 이용약관 동의(필수) 체크박스
    cy.get('input[name="termsOfServices"]').click();
    cy.get('input[name="termsOfServices"]').should('be.checked');
    cy.get('input[name="termsOfServices"]').click();
    cy.get('input[name="termsOfServices"]').should('not.be.checked');

    // 개인정보 관련 체크박스
    cy.get('input[name="privacyPolicy"]').click();
    cy.get('input[name="privacyPolicy"]').should('be.checked');
    cy.get('input[name="privacyPolicy"]').click();
    cy.get('input[name="privacyPolicy"]').should('not.be.checked');

    // 광고 전송 동의 체크박스
    cy.get('input[name="promotion"]').click();
    cy.get('input[name="promotion"]').should('be.checked');
    cy.get('input[name="promotion"]').click();
    cy.get('input[name="promotion"]').should('not.be.checked');

    // 전부체크
    cy.get('input[name="adult"]').click();
    cy.get('input[name="adult"]').should('be.checked');
    cy.get('input[name="termsOfServices"]').click();
    cy.get('input[name="termsOfServices"]').should('be.checked');
    cy.get('input[name="privacyPolicy"]').click();
    cy.get('input[name="privacyPolicy"]').should('be.checked');
    cy.get('input[name="promotion"]').click();
    cy.get('input[name="promotion"]').should('be.checked');


    cy.get('input[type="checkbox"]:checked').each(($checkbox) => {
      cy.wrap($checkbox).uncheck();
    });

    // [만 14세 미만 일때] -> (1.보호자 문구 확인, 2. 보호자동의하기 버튼문구확인 )
    cy.get('input[name="adult"]').should('not.be.checked');
    cy.get('input[name="termsOfServices"]').check();
    cy.get('input[name="privacyPolicy"]').check();
    cy.get('span.MuiTypography-caption').should('be.visible');
    cy.get('input[name="adult"]').should('not.be.checked');
    cy.get('.MuiButtonBase-root').should('have.text', "보호자 동의하기");


    //[만 14세 이상 일때] ->  (1 보호자 문구 미노출 확인 , 2. 동의하기 버튼 문구 확인)
    cy.get('input[name="adult"]').check();
    cy.get('.MuiButtonBase-root').should('have.text', "동의하기");
  });


  it('필수 약관 노출 확인 [이용약관 동의(필수)] , [개인정보 수집 및 이용에 관한 동의(필수)]', () => {
    cy.get('.MuiButtonBase-root').first().trigger('mouseover');
    // [자세히] 글씨가 노출 확인
    cy.get('button[aria-label="자세히"]').should('be.visible');
    cy.get(':nth-child(2) > .MuiIconButton-root').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click(); //미니 팝업 닫기버튼 클릭 [이용약관 동의]

    cy.get(':nth-child(3) > .MuiIconButton-root').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click(); //미니 팝업 닫기버튼 클릭 [개인정보 수집]

  });


  it('만 14세 미만 [보호자 동의하기] 통신사 인증 노출 확인 ', () => {
    cy.get('input[name="termsOfServices"]').check();
    cy.get('input[name="privacyPolicy"]').check();
    cy.get('.MuiButton-root').should('have.text', "보호자 동의하기").click();
    cy.wait(5000);
    cy.get('.imp-header .imp-close').click(); // PASS 인증창  닫기    부모요포함해서찾으니됨

  });


  it('만 14세 이상 [동의하기] 회원가입 페이지 노출 확인 ', () => {
    cy.get('input[name="adult"]').check();
    cy.get('input[name="termsOfServices"]').check();
    cy.get('input[name="privacyPolicy"]').check();

    cy.get('.MuiButton-root').should('have.text', "동의하기").click();

    cy.url().should('include', '/accounts/signup/method');



    // 랜더링 체크
    cy.get('.MuiTypography-subtitle1')
      .should('be.visible')
      .should('have.text', "가입 방법을 선택하세요");

    cy.get('button[aria-label="Kakao"]')
      .should('be.visible')
      .should('have.text', "카카오로 3초 만에 가입하기");

    cy.get('.MuiButton-sizeMedium')
      .should('be.visible')
      .should('have.text', "이메일로 가입하기");

    // 더보기 영역 [추가 SNS 로그인 6종]
    cy.get('.css-1n4x2a0 > .MuiTypography-root')
      .should('be.visible')

    cy.get('.css-3smlhm').should('be.visible').should('have.text', "이미 계정이 있으신가요?로그인하기");


    cy.get('.css-3smlhm > .MuiTypography-root').should('be.visible'); // 로그인하기 영역



    cy.get('.css-1n4x2a0 > .MuiTypography-root').click(); // 더보기 클릭

    // 추가 SNS 로그인 6종 [함수화]
    cy.snsClickCheck(["Microsoft", "Facebook", "Naver", "Github", "Apple", "Whalespace"]);

  })

  it('회원 가입 완료 확인 (이메일로 가입, Validation)', () => {

    cy.get('input[name="adult"]').check();
    cy.get('input[name="termsOfServices"]').check();
    cy.get('input[name="privacyPolicy"]').check();
    cy.get('.MuiButton-root').should('have.text', "동의하기").click();
    cy.url().should('include', '/accounts/signup/method');
    cy.get('.MuiButton-sizeMedium').should('have.text', "이메일로 가입하기").click();


    cy.get('.css-8g8ihq')
      .should('be.visible')
      .should('have.text', "계정을 생성하세요")


    cy.get('form[data-cy="signin-form"]').should('be.visible');
    cy.get('input[name="fullname"]').type('경섭');
    cy.get('input[name="loginId"]').type('rudtjq2323@'); // 유효하지 않는 이메일 형식 입력
    cy.get('#mui-10-helper-text').should('be.visible').should('have.text', "이메일 주소가 올바르지 않습니다.");
    cy.get('input[name="loginId"]').clear();

    cy.get('input[name="loginId"]').type('rudtjq5724@naver.com'); // 이미 가입된 이메일 주소 입력



    cy.get('.css-120w4o3.MuiFormHelperText-root')
      .should('be.visible')
      .invoke('text')
      .should('include', '영문, 숫자, 특수문자를 조합하여 8자 이상으로 구성해주세요.');



    cy.get('input[name="password"]').type('weak'); // 유효하지 않은 비밀번호 입력



    cy.get('.MuiFormHelperText-root.Mui-error') // 2개 클래스 이름을 조합해 선택
      .should('be.visible')
      .invoke('text')
      .should('include', '비밀번호를 더 강력하게 만들어주세요! 영문, 숫자, 특수문자를 포함해 8자 이상으로 조합해보세요.');


    cy.get('input[name="password"]').clear();

    cy.get('input[name="password"]').type('asdasda52#!%^^'); // 유효한 비밀번호 입력 1차 
    cy.get('input[name="confirmPassword"]').should('exist'); // 비밀번호 재확인 필드 노출 확인 
    cy.get('input[name="confirmPassword"]').type('asdasdasd@$2#$');
    cy.get('#mui-13-helper-text').should('be.visible').should('have.text', "비밀번호가 일치하지 않습니다."); // ??????? #mui-13-helper-text


    cy.get('input[name="confirmPassword"]').clear();
    cy.get('input[name="confirmPassword"]').type('asdasda52#!%^^');
    cy.get('button[aria-label="비밀번호 보기"]').click(); // 비밀번호 보기 버튼 클릭
    cy.get('button[aria-label="비밀번호 보기"]').click(); // 감추기? 명칭 

    cy.get('input[name="loginId"]').clear();
    cy.get('input[name="loginId"]').type(generateRandomUsername()); // 난수로 계정 생성
    cy.get('svg[data-testid="CheckCircleIcon"]').should('exist'); // 이메일 유효 인증 마크

    cy.get('.css-9rxtz0').click(); // 회원가입 클릭
    cy.url().should('include', '/members/account')
    cy.getCookie('eliceSessionKey').should('exist')


  });
})



