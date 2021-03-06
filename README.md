# TMIDb



## 팀원 정보 및 업무 분담 내역

#### 한상우

- erd 그리기
- api 요청
- json파일 가공
- django
- css



#### 이승훈

- 크롤링
- csv파일 가공
- vue
- ppt 제작
- 발표



## 핵심 기능

- 처음에 로그인 창
- 회원가입을 할 때 이름, 비밀번호, 비밀번호 확인, 관객 평점/비평가 평점과 전세계 평점/한국인 평점 등의 정보를 받는다
- 들어가면 홈화면이 뜨는데 이는 왼쪽 위의 로고를 눌러서도 접속할 수 있다
  - 홈 화면에는 랜덤한 영화가 12개 출력된다
- 영화에 마우스를 갖다대면 제목과 다양한 사이트의 평점 정보가 나오며 클릭하면 영화 정보를 볼 수 있다
  - 영화 정보에 들어가면 제목, 장르, 예산, 다양한 사이트의 평점, overview가 나오며
  - 좋아요 기능(하트 색이 바뀜), 리뷰(리뷰와 별점을 매겨서 제출버튼을 누르면 리뷰가 써짐) 기능이 있다
  - 리뷰를 쓰고 나면 리뷰는 한번만 남길 수 있어요!라는 문구가 나오며
  - 작성한 리뷰가 작성된 순으로 표시된다
  - 리뷰는 수정, 삭제 가능
- 추천영화 탭을 누르면 회원가입시 받은 정보에 따라 영화를 10가지 추천해준다
  - 이 역시 영화 정보에 해당하는 모든 것이 가능
- 무작위영화 탭을 누르면 무작위 영화가 하나 출력된다
  - 이 역시 영화 정보에 해당하는 모든 것이 가능
- 커뮤니티 탭을 누르면 글쓰기와 게시물을 확인할 수 있다
  - 게시물을 작성하고 밑의 엔터를 누르면 글이 써짐
  - 게시물 들어가면 제목, 작성자, 내용, 좋아요 수, 댓글이 나오고
  - 작성자 누르면 프로필로 가진다
  - 좋아요는 누르면 색이 바뀐다
  - 댓글은 수정/삭제, 수정 누르면 완료/뒤로가기 가능
- 검색 창에서 영화를 검색하면 해당 단어가 들어가는 영화 리스트가 나옴
  - 공백을 무시하고 검색할 수 있음
    - ("     해리포터와비밀의방      "이라고 검색해도 "해리 포터와 비밀의 방" 검색 가능)
  - 이 역시 영화 정보에 해당하는 모든 것이 가능

- 프로필에 가면 프로필 수정, 작성한 게시글, 좋아요한 게시글, 좋아요한 영화를 받아볼 수 있음
  - 프로필 수정시 전에 입력했던 관객평점/비평가평점, 전세계인평점/한국인평점 수정 가능
- 로그아웃 가능