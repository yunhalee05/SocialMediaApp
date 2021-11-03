<div align="center">
    <br/>
    <h1><strong><em>👭 Social Media App</em></strong></h1>
    <img width="800" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137139442-a027d189-f78e-4cd8-a54d-8658dc2efa6c.png">
    <br/>
    <br/>
    <p>
      Social Media App은 <strong><em>SNS활동</em></strong> 을 위하여 만들어진 앱입니다.<br/> 
      친한 친구, 혹은 관심있는 인플루언서를 팔로우하여 친구의 최근 근황을 확인하고, 소통을 나누는 공간입니다. <br/>
      일상이나 최근 관심사, 공유하고 싶은 사진과 함께 근황을 업로드하고 친구들의 소식도 확인할 수 있습니다.<br/>
      로그인한 친구와 함께 음성통화, 영상통화, 실시간 메세지 보내기도 가능합니다.<br/>
    </p>
    <br/>
    <br/>
    <a href="https://social-media-with-you.herokuapp.com"><strong>social-media-app-with-you</strong></a>
</div>
    <br/>
    <br/>
    <br/>
<div>
    <h2>🚀 Shortcut</h2>
<div> 
        
- [__Improvement__](#improvement)
- [__Challenges__](#challenges)
- [__Tech Stack Used__](#tech)
- [__Features__](#feature)
- [__Implementation__](#implementation)
- [__Structure__](#structure)

</div>
    <br/>
    <br/>
    <br/>
<div>
    <h2 id="improvement">🍕 Improvement</h2>
    <ul>
      <li>
        <h3>✔️ Follow 기능 만들기</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>
                팔로우 기능을 만들기 위해서는 하나의 모델이 동일 모델의 다른 사용자 리스트를 가지고 있어야 하는데, noSQL과 같은 비관계형 데이터베이스에서 어떻게 연관관계를 생성해내는지 배우고자 하였습니다.
              </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                mongoDB와 같은 noSQL(비관계형 데이터베이스)에서 <strong><em>Mongoose</em></strong> 를 사용하여 오브젝트 관계 매핑에 대해 배웠습니다. User모델안에 오브젝트 아이디 타입 리스트인 followers, followings을 생성하였습니다.
                아이디타입으로 저장이 되어있기 때문에 아이디타입의 데이터를 실제로 가져오기 위해서 mongodb의 populate기능을 사용하여 정보를 가져오도록 구현했습니다. 
                Post모델에서도 동일하게 포스트를 작성한 유저의 정보를 가지고 있어야 하므로 오브젝트 아이디 타입으로 작성자 저장 후 populate로 정보를 가져오도록 하였습니다. 
              </p>
            </li>
          </ul>
      </li>
      <li>
        <h3>✔️ WebSocket</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>매세지 기능과 더불어, 사용자의 활동으로 인한 데이터 변경을 같은 정보를 보고 있는 또 다른 사용자에게 실시간으로 반영되도록 하고자 하였습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                <strong><em>Socket.io</em></strong> 를 통하여 실시간 소통이 가능하도록 설정하였습니다. socket.io는 특정 사용자 혹은 일부의 사용자 등 수신자를 지정하여 메세지를 전달 할 수 있어 메세지를 전달하고 수신하기에 편리한 라이브러리였습니다. 
                사용자가 로그인하면 socket서버에서 로그인한 유저정보를 저장해놓고, 공통으로 보여지는 데이터를 변경하면 socket통신을 통해서 로그인한 사용자들에게 변경사항을 보내고 공통데이터를 다루고 있다면 redux의 dispatcher를 통해 view를 변경하도록 설정하였습니다. 
                이를 통하여 메세지 뿐 아니라, 좋아요, 댓글, 알림 기능을 실시간으로 반영되도록 하였습니다. 프론트엔드와 서버의 소켓은 각각 SocketClient.js, SocketServer.js으로 다른 코드와 분리되어 유지보수가 용이하도록 설정하였습니다. 
              </p>
            </li>
          </ul>       
      </li>
      <li>
        <h3>✔️ WebRTC</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>메세지 창에서 로그인한 유저에 대해서 실시간 음성통화뿐 아니라, 영상통화 또한 가능하도록 구현하고 싶었습니다. 서버의 성능에 구애받지 않고 기기간의 통신이 가능하도록 설정하고자 하였습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                실시간 통화의 기능은 <strong><em>Peer js</em></strong> 을 이용하여 구현했습니다. 사용자가 서버에 접속하면 3001포트에 peer server를 열어주고, 사용자가 접속한 유저에 대해서 통화버튼을 누르면 상대편에게 생성된 'call'을 peerjs를 통해 on으로 수신하여 실시간 통화가 가능하도록 하였습니다. 
                만약 영상통화를 실행하였다면 video스트리밍을 통해 서로 화면스트리밍을 주고받을 수 있도록 설정하였습니다. 통화가 종료되면 통화 대상자들의 대화창에 통화내역에 대한 정보가 메세지의 형태로 생성되도록 socket.io를 이용하여 call message를 보냈습니다.
              </p>
            </li>
          </ul>
      </li>
      <li>
        <h3>✔️ Infinite Scrolling</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>
                데이터양이 증가하면 한번에 가져올 수 있는 데이터를 제한하여 불러오는 Pagination과 더불어 무한 스크롤을 이용하여 데이터를 화면에 보여주고자 하였습니다. 예를 들어 메인 홈페이지에서 포스트를 모두 읽고 나면(페이지의 하단부분으로 이동하면) 새로운 데이터를 가져와 화면에 추가로 보여주고자 하였습니다. 
              </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                <strong><em>Intersection Observer</em></strong> 와 <strong><em>useRef</em></strong> 를 통하여 화면에 일정부분이 나타날 때 마다 새로운 데이터를 요청하여 받아오도록 설정하였습니다. 
                가져온 포스트의 끝부분에 button을 생성하고, useRef를 이용하여 버튼이 화면에 나타날 때마다 새로운 데이터를 받아오는 action을 실행하도록 구현하였습니다. 
              </p>
            </li>
          </ul>
      </li>
      <li>
        <h3>✔️ OAuth2</h3> 
          <ul>
            <li>
              <h4>Challenge : </h4>
              <p>
                사용자의 편의를 위해서 이전 프로젝트에서 진행했던 구글이외에도 카카오, 네이버의 소셜로그인버튼 또한 기능을 구현하고자 하였습니다. 
              </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                기존 프로젝트(react-google-login)와는 다르게 <strong><em>Rest API</em></strong> 를 통하여 소셜사이트와 프로그램이 어떻게 데이터를 주고받는지 확인하고자 하였습니다. 예를들어 카카오에서는 버튼에는 authorization_code를 요정하는 링크를 생성하고, 받아온 authorization_code로 access_token을 발급받아 이를 통해 회원정보를 가져올 수 있도록 하였습니다. 가져온 회원정보는 회원등록이 가능하도록 처리하였습니다. 
              </p>
            </li>
          </ul>
      </li>
    </ul>
</div>
    <br/>
    <br/>
    <br/>
<div>
    <h2 id="challenges">⚡️ Challenges</h2>
    <ul>
      <li>
        <h3>✔️ Too many re-renders(Infinite Loop) 오류 </h3> 
          <ul>
            <li>
              <h4>Reason : </h4>
              <p>
                onClick 이벤트를 함수로 실행시에 "Too many re-renders. React limits the number of renders to prevent an infinite loop" 에러가 발생하였습니다. 이 오류는 리액트에서 onClick 이벤트로 실행되는 콜백함수에서 state 상태를 변경하려고 하여 리렌더링이 계속해서 이뤄지면서 발생하는 오류였습니다. 
              </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                onClick 이벤트로 실행되는 함수를 화살표 함수로 변경해주어 리렌더링 되는 것을 방지하여 해결하였습니다. 
              </p>
            </li>
          </ul>
      </li>
      <li>
        <h3>✔️ Data URI의 이미지타입 오류 </h3> 
          <ul>
            <li>
              <h4>Reason : </h4>
              <p>프로젝트 진행중 canvas를 통한 화면캡쳐기능을 이용하여 포스트작성이 가능하도록 할 때, 촬영된 이미지의 URI가 Data URIs(base 64인코딩)로 생성되어 기존의 이미지와 같이 서버로 보낼 파일리스트에 파일형식으로 저장하는데 오류가 발생하였습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                생성된 Data URI를 atob로 디코딩하여 새로운 배열을 생성해준 뒤, Unit8Array를 이용하여 새로운 image/png타입의 Blob파일로 바꿔주었습니다. Blob파일로 변경된 이미지는 파일형식으로 파일리스트에 추가하는 것이 가능하였습니다. 
              </p>
            </li>
          </ul>       
      </li>
      <li>
        <h3>✔️ OAuth2 Cors 오류 </h3> 
          <ul>
            <li>
              <h4>Reason : </h4>
              <p>RestAPI를 이용하여 네이버 OAuth2 진행시, 프론트엔드 부분에서 받은 인증코드(authorization_code)로 access_token을 발급하려는 경우 cors오류가 발생하였습니다. 이는 네이버에서 client_id, client_secret을 도용하여 api를 호출하는 것을 방지하기 위해서 서버측(node js)에서만 발급이 가능하도록 설정되어 있기 때문이었습니다. 카카오의 경우에는 access_token은 프론트에서도 발급이 가능했지만, 네이버는 이를 허용하고 있지 않았습니다. </p>
            </li>
            <li>
              <h4>Solution : </h4>
              <p>
                네이버 아이디로 로그인(네아로)를 구현할 떄, 서버가 아닌 프론트엔드에서 access_token을 받아오는 방법으로는 첫번째로 JDK를 사용하는 방법이 있었습니다. index.html에 해당 JDK스크립트를 추가해주고 실행시켜 이를 이용해 인증하고 데이터를 받아오는 방법이 있었습니다. 두번째로 처음 인증 코드를 요청할 때 response_type=token을 실행하여 바로 access_token을 받아오는 방법이 있었습니다. 해당 프로젝트에서는 두번째 방법으로 바로 access_token을 발급받아 해당 오류를 해결하도록 하였습니다. 
              </p>
            </li>
          </ul>
      </li>
    </ul>
</div>
    <br/>
    <br/>
    <br/><div>
    <h2 id="tech">🛠 Tech Stack Used</h2>
    <ul>
      <li>
        <h4>Frontend</h4> 
        <img src="https://img.shields.io/badge/react-6cc1d9?style=for-the-badge&logo=react&logoColor=white">
        <img src="https://img.shields.io/badge/redux-bb93e6?style=for-the-badge&logo=redux&logoColor=white">
        <img src="https://img.shields.io/badge/fontawesome-102969?style=for-the-badge&logo=redux&logoColor=white">
        <img src="https://img.shields.io/badge/bootstrap-3e1b6b?style=for-the-badge&logo=redux&logoColor=white">
        <img src="https://img.shields.io/badge/socket.io Client-e37dc9?style=for-the-badge&logo=socket.io&logoColor=white">
        <img src="https://img.shields.io/badge/peerjs-e3834b?style=for-the-badge&logo=socket.io&logoColor=white">
      </li>
      <li>
        <h4>Backend</h4> 
        <img src="https://img.shields.io/badge/mongodb-609e46?style=for-the-badge&logo=mongoDB&logoColor=white">
        <img src="https://img.shields.io/badge/express-020d00?style=for-the-badge&logo=express&logoColor=white">
        <img src="https://img.shields.io/badge/node.js-f7c920?style=for-the-badge&logo=node.js&logoColor=black">
        <img src="https://img.shields.io/badge/socket.io-e37dc9?style=for-the-badge&logo=socket.io&logoColor=white">
        <img src="https://img.shields.io/badge/peer-e3834b?style=for-the-badge&logo=socket.io&logoColor=white">
      </li>
      <li>
        <h4>Deploy</h4> 
        <img src="https://img.shields.io/badge/heroku-ad7dac?style=for-the-badge&logo=heroku&logoColor=white">
      </li>
    </ul>
</div>
    <br/>
    <br/>
    <br/>
<div>
    <h2 id="implementation">🍔 Implementation</h2>
    <ul>
      <li>
        <h3>✔️ MERN </h3> 
        <p>
          전체적인 프로젝트는 MERN스택을 이용하여 구현하였습니다. 
          MongoDB, Express, React, Node.js의 구조를 통해서 express 프레임워크를 통해서 node.js 서버구축 후, react를 이용한 프론트엔드와 소통하고 프론트엔드의 필요에 따라 데이터를 요구하면 서버가 데이터베이스에서 알맞은 정보를 가져와 프론트엔드로 전달해줍니다. 
        </p>
      </li>
      <li>
        <h3>✔️ MVC pattern</h3> 
        <p>
          <strong><em>Model, View, Controller</em></strong> 의 구조를 통하여 사용자 인터페이스로부터 로직을 분리하여 유지보수에 유리하도록 설정하였습니다. 
          Model, View, Controller는 mvc 패턴을 통하여 각각의 기능에만 집중할 수 있도록 설정되었습니다.
        </p>
      </li>
      <li>
        <h3>✔️ Authentication & Authorization</h3> 
        <p>
          <strong><em>JWT인증토큰</em></strong> 을 통하여 로그인 사용자정보를 인증할 수 있도록 하였는데 이는 사용자의 인증정보를 토큰에 가지고 있어 별도의 저장소가 필요하지 않는 장점이 있었습니다. 또한 로그인된 사용자의 정보는 각각의 요청마다 반복되는 부분은 express의 <strong><em>middleware</em></strong> 를 통하여 인증처리를 구현하도록 하였습니다.
          사용자의 비밀번호를 DB에 저장할 때에는 보호를 위하여 Bcrypt를 이용하여 비밀번호를 해싱하여 저장하였습니다. 권한부여는 PrivateRoute를 통해서 각각의 싱글페이지에 대해서 접속이 가능한 대상을 다르게하여 페이지 액세스 권한부여를 설정하였습니다. 만약 권한이 제한된 페이지로 이동한 사용자라면 이전페이지나 다른페이지로 이동하도록 설정하였습니다.
        </p>
      </li>
      <li>
        <h3>✔️ Redux</h3> 
        <p>리덕스를 통하여 View에서는 action만을 실행시키면 이 액션은 dispatcher를 통해서만 데이터변경이 가능하도록 설정해주었습니다. 변경된 데이터는 store를 통해서 View로 전달이 되도록 하여 단방향의 데이터 흐름이 이루어지도록 설정하였습니다. 또한 Constant를 지정하여 각각의 액션에 요청, 성공, 실패의 경우를 알아보기 쉽게 정의하였고 각각의 액션은 모두 저장되어 어떻게 데이터가 변경되었는지 확인할 수 있었습니다. </p>
      </li>
    </ul>
</div>
    <br/>
    <br/>
    <br/>
<div id="feature">
</div>
    
🪵 Features
--
<br/>
<h4> 🧀 사용자, 포스트에 대한 CRUD(Create, Read, Update, Delete) 가능</h4>
<h4> 🧀 사용자 이름이나 키워드를 이용한 사용자 검색 기능 </h4>
<h4> 🧀 사용자가 다른 사용자를 실시간으로 팔로우하거나 팔로우한 대상 언팔로우 기능</h4>
<h4> 🧀 포스트에 실시간으로 좋아요 표시 기능</h4>
<h4> 🧀 마음에 드는 포스를 북마크하연 내 프로필화면에서 확인 가능</h4>
<h4> 🧀 WebSocket(socket.io) WebRTC(peerjs)를 이용한 실시간 화상/음성통화 기능</h4>
<h4> 🧀 실시간 메세지 채팅 기능</h4>
<h4> 🧀 구글, 네이버, 카카오 소셜로그인 기능</h4>
<br/>

|  |  |
|:--------|:--------:|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/139517376-4271f02c-f83a-4218-96d0-773e06853244.jpg"></br><p><strong>로그인페이지</strong></p><p>소셜로그인 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137157056-2cc5a81f-721d-4883-9c0b-e688a862901e.png"></br><p><strong>메인페이지</strong></p><p>사용자 추천과 팔로우한 사용자 포스트 나열.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137157460-fb0101eb-3415-4e4e-8f82-ec30abfe0f44.png"></br><p><strong>프로필페이지</strong></p><p>사용자의 포스트와 북마크한 포스트 확인 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137157693-141efbf6-d61e-465d-8502-d664e71c44a5.png"></br><p><strong>알람</strong></p><p>팔로우한 사용자의 활동을 헤더의 알람으로 확인.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137159185-1a562f96-1c7f-4617-a8e1-d79a7dbe5af0.png"></br><p><strong>프로필페이지</strong></p><p>팔로우 정보 확인하고 팔로우 언팔로우 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137170414-7aaeab5e-255f-401e-bafd-94c83551d9f1.png"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137170615-656f3d74-e0a1-483c-9edf-ab34168643c1.png"></br><p><strong>반응형 웹페이지</strong></p><p>화면 크기에 따라 반응형으로 웹페이지 설계.</p></div>|
|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137158829-5d53f6f4-c29a-4083-8a48-ace30650671d.png"></br><p><strong>디스커버페이지</strong></p><p>팔로우하지 않은 사용자들의 포스트들 랜덤으로 확인 가능.</p></div>|<div align="center"><img height="200px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137158654-e7b2e7be-eff0-4c90-a1fd-5b2259ee404e.png"></br><p><strong>메세지페이지</strong></p><p>실시간 메세지 및 사용자 온라인 정보 확인 가능.</p></div>|

<div align="center">
  </br>
  <img width="800px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137169143-53d803ff-b566-4acb-9e67-211562e0167b.gif">
  </br>
  <p><strong>좋아요</strong></p>
  <p>좋아요 정보를 실시간으로 업데이트.</p>
    </br>
  <img width="800px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137169421-a7a47496-7178-4224-9493-917b90cf2d7d.gif">
  </br>
  <p><strong>채팅</strong></p>
  <p>실시간으로 메세지 전달 가능.</p>
    </br>
  <img width="800px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137166587-9bc106d4-7ad6-40f5-8210-96fb64fbf20f.gif">
  </br>
  <p><strong>음성통화</strong></p>
  <p>실시간으로 음성통화 가능.</p>
    </br>
  <img width="800px" alt="스크린샷 2021-10-02 오후 6 48 23" src="https://user-images.githubusercontent.com/63947424/137168566-eb87e7ef-d44e-479a-987a-17be1f2a880d.gif">
  </br>
  <p><strong>영상통화</strong></p>
  <p>실시간으로  가능.</p>
    </br>
</div>
    <br/>
    <br/>
    <br/>
<div>
    <h2 id="structure">🧱 Structure</h2>
</div>

```bash
📦SocialMediaApp
├── 🗂client
│   ├── src
│   │   ├── App.js
│   │   ├── SocketClient.js
│   │   ├── _actions
│   │   │   ├── NotifyActions.js
│   │   │   ├── commentActions.js
│   │   │   ├── messageActions.js
│   │   │   ├── postActions.js
│   │   │   ├── profileActions.js
│   │   │   ├── suggestionActions.js
│   │   │   └── userActions.js
│   │   ├── _constants
│   │   │   ├── callConstants.js
│   │   │   ├── commentConstants.js
│   │   │   ├── globalConstants.js
│   │   │   ├── messageConstants.js
│   │   │   ├── notifyConstants.js
│   │   │   ├── onlineCheckConstants.js
│   │   │   ├── postConstants.js
│   │   │   ├── profileConstants.js
│   │   │   └── userConstants.js
│   │   ├── _reducers
│   │   │   ├── callReducers.js
│   │   │   ├── messageReducers.js
│   │   │   ├── notifyReducers.js
│   │   │   ├── onlineCheckReducers.js
│   │   │   ├── postReducers.js
│   │   │   ├── profileReducers.js
│   │   │   ├── socketReducers.js
│   │   │   ├── statusReducers.js
│   │   │   ├── store.js
│   │   │   ├── suggestionReducers.js
│   │   │   └── userReducers.js
│   │   ├── audio
│   │   │   └── ring.mp3
│   │   ├── component
│   │   │   ├── common
│   │   │   │   ├── Alert.js
│   │   │   │   ├── Avatar.js
│   │   │   │   ├── FollowBtn.js
│   │   │   │   ├── Icons.js
│   │   │   │   ├── Loading.js
│   │   │   │   ├── PostThumb.js
│   │   │   │   ├── Times.js
│   │   │   │   └── UserCard.js
│   │   │   ├── header
│   │   │   │   ├── Header.js
│   │   │   │   └── NotifyModal.js
│   │   │   ├── messages
│   │   │   │   ├── CallModal.js
│   │   │   │   ├── Display.js
│   │   │   │   ├── LeftSide.js
│   │   │   │   ├── Message.js
│   │   │   │   └── RightSide.js
│   │   │   ├── post
│   │   │   │   ├── Post.js
│   │   │   │   ├── comments
│   │   │   │   │   ├── CommentCard.js
│   │   │   │   │   ├── CommentDisplay.js
│   │   │   │   │   └── CommentMenu.js
│   │   │   │   └── post_card
│   │   │   │       ├── CardBody.js
│   │   │   │       ├── CardFooter.js
│   │   │   │       ├── CardHeader.js
│   │   │   │       ├── Carousel.js
│   │   │   │       ├── Comments.js
│   │   │   │       ├── InputComment.js
│   │   │   │       ├── LIkeButton.js
│   │   │   │       ├── PostCard.js
│   │   │   │       └── ShareModal.js
│   │   │   ├── profile
│   │   │   │   ├── EditProfile.js
│   │   │   │   ├── Followers.js
│   │   │   │   ├── Followings.js
│   │   │   │   ├── SavedPost.js
│   │   │   │   └── UserInfo.js
│   │   │   ├── status
│   │   │   │   ├── Status.js
│   │   │   │   └── StatusModal.js
│   │   │   └── suggestion
│   │   │       ├── SuggestionBox.js
│   │   │       └── SuggestionCard.js
│   │   ├── customRouter
│   │   │   └── PrivateRouter.js
│   │   ├── pages
│   │   │   ├── Discover.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── MessagePage.js
│   │   │   ├── Post.js
│   │   │   ├── Profile.js
│   │   │   ├── RegisterPage.js
│   │   │   └── SocialLogin.js
│   │   ├── styles
│   │   │   ├── alert.css
│   │   │   ├── auth.css
│   │   │   ├── avatar.css
│   │   │   ├── call_modal.css
│   │   │   ├── comment.css
│   │   │   ├── global.css
│   │   │   ├── header.css
│   │   │   ├── home.css
│   │   │   ├── icon.css
│   │   │   ├── loading.css
│   │   │   ├── messages.css
│   │   │   ├── post_thumb.css
│   │   │   ├── profile.css
│   │   │   └── status_modal.css
│   │   ├── env.js
│   │   ├── images
│   │   ├── index.css
│   │   ├── index.js
│   │   └── utils.js
├── 🗂middleware
│   └── auth.js
├── 🗂models
│   ├── Comment.js
│   ├── Conversation.js
│   ├── Message.js
│   ├── Notify.js
│   ├── Post.js
│   └── User.js
├── 🗂routes
│   ├── commentRouter.js
│   ├── discoverRouter.js
│   ├── messageRouter.js
│   ├── messageUploadRouter.js
│   ├── notifyRouter.js
│   ├── postRouter.js
│   ├── postUploadRouter.js
│   ├── profileUploadRouter.js
│   ├── searchRouter.js
│   └── userRouter.js
├── server.js
├── SocketServer.js
├── postuploads
├── profileuploads
├── messageuploads
└── uploads  
```
