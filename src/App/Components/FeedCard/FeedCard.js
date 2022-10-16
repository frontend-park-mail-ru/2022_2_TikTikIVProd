/*
  photoLink: string;
  description: string;
  likes: number;
  date: Date;
  author_name: string;
  author_photo: string;
*/
const source = `
<div class="feed__card">
  <div class="feed__card__author">
    <div class="feed__card__author__photo">{{author_photos}}</div>
    <div class="feed__card__author__name">{{author_name}}</div>
  </div>
  <div class="feed__card__date">{{date}}</div>
  <div class="feed__card__description">
    {{description}}
  </div>
  <div class="feed__card__image__wrapper">
    <img class="feed__card__image" src="{{photoLink}}" />
  </div>
  <div class="feed__card__bottom">
    <div class="feed__card__bottom__likes">{{likes}}</div>
  </div>
</div>
`;
const feedCardTemplate = Handlebars.compile(source);
export default feedCardTemplate;
