# STOMP 채팅

## 관련 라이브러리
- react-router-dom
- react-query
- sockjs-client
- stomp/stompjs

## 실행법
~~~vi
npm install
npm run dev
~~~

## 기본 홈 주소
domain/room  

## 참고사이트
https://www.daddyprogrammer.org/post/4691/spring-websocket-chatting-server-stomp-server/  
openai 참고  

## 학습내용 정리
- 리액트 라우터(v6)  
리액트는 SPA이기때문에 하나의 페이지안에서 컴포넌트의 변화가 일어나면서 화면이 바뀌는것이고,  
이러한 환경에서 사용자는 원하는 페이지의 북마크, 뒤로가기를 위한 히스토리 기능을 수행할 수 없기 때문에  
이러한 단점을 보완하기위해 React Router를 사용함으로써  
URL을 어느 페이지로 연결시킬지 결정하는 일을 한다.  
`createBrowserRouter`를 사용하여 path에 따른 element를 설정해주며(root.jsx)  
`<RouterProvider>`를 사용하여 앱의 최상위에서 구성요소들을 전달하고 활성화해준다.(App.jsx)  


- ~~리액트 쿼리~~  
~~fetching, caching, 서버 데이터와의 동기화를 지원해주는 라이브러리~~  
~~복잡하고 장황한 코드가 필요하지 않고 React Component 내부에서 간단하고 직관적으로 API를 사용할 수 있다.~~  
~~`QueryClient`와 `QueryClientProvider`를 사용하여 앱의 최상위에서 앱을 감싸줌으로써 셋팅을 해주고(App.jsx)~~  
... 현 프로젝트에서는 실질적으로 사용하지 않았음!


- Suspense
컴포넌트가 렌더링 되기 전에 데이터 로딩을 기다릴 수 있게 해줌(root.jsx)  
lazy를 사용하여 초기에 필요한 컴포넌트만 로드해 초기 로딩 속도를 개선할 수 있다. => 성능최적화에 도움  
Error Boundary와 함께 사용하면 에러가 발생했을 때 사용자에게 적절한 피드백을 제공하여 사용자에게 더 나은 경험을 제공할수있다.  
[React Suspense: 리액트 서스펜스를 사용하는 이유와 사용법 총정리](https://www.elancer.co.kr/blog/detail/267)  

- location.href vs useNavigate vs Link  
셋 모두 이동을 위해서 사용하는 코드이지만 약간의 차이점이 존재한다.  
우선 `location.href`를 사용하면 페이지가 전체적으로 리로드된다.  
SPA인 리액트에서는 적절하지않다.  
`useNavigate`의 경우에는 페이지를 리로드 하지 않고 상태를 유지하며 경로를 이동할수있게 해준다.  
인자로 path값을 넘겨주면 해당경로로 이동이 가능하며, js에서 조건에 따라 다른 페이지로 이동시킬 수 있다.  
`<Link>`컴포넌트는 `<a>` 태그처럼 동작하지만, 페이지를 리로드하지 않고 경로 변경을 처리한다.  
(MainPage.jsx)  

- 리덕스 툴킷(redux-toolkit)  
전역적인 상태관리를 위한 라이브러리
store :
reducer :
dispatch : 
createAsyncThunk : api 호출하는 상황에서 비동기처리를 해야하는데 redux store에서는 자체적으로 하지못하는 단점이 있기때문에 redux-thunk와 같은 미들웨어를 사용하여 비동기 처리를 진행하였다. 물론 useEffect를 사용할수도있으나 컴포넌의 외부에서의 비동기처리를 위해 관심사분리가 가능한 createAsyncThunk를 사용한다. 또한 러닝커브문제로 Redux-Toolkit의 createAsyncThunk를 사용해 비동기처리를 하였다.


## 학습 참고
- 리액트 라우터 : [haesa:티스토리](https://pd6156.tistory.com/269)  
- 리액트 쿼리 : [haesa:티스토리](https://leego.tistory.com/entry/react-query%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%A0%EA%B9%8C)  
[[React-Query] React-Query 개념잡기](https://velog.io/@kandy1002/React-Query-%ED%91%B9-%EC%B0%8D%EC%96%B4%EB%A8%B9%EA%B8%B0)  
- location.href vs useNavigate vs Link : [window.location.href vs useNavigate vs Link
](https://code00.tistory.com/121)  
- 리덕스 툴킷 : [Redux-toolkit으로-상태관리하기](https://velog.io/@mael1657/Redux-toolkit%EC%9C%BC%EB%A1%9C-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0#redux-toolkit-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC)