import { IFeedData } from "../../models/FeedModel/FeedModel.js";
import createDiv from "../BasicComponentsCreators/CreateDiv/CreateDiv.js";
import IComponent from "../IComponent/IComponent.js";

export default class Feed {

    private parent;
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    render(data: Array<IFeedData>) {
        const feedView = createDiv({ styles: ['feed'] });

        data.forEach((e) => {
            const post = createDiv({ styles: ['feed__element'] });
            const author = createDiv({ styles: ['feed__author'] });
            author.appendChild(createDiv({ styles: ['feed__author__photo'] }));
            author.appendChild(createDiv({ styles: ['feed__author__name'], text: e.author_name }));
            const dateEdit = createDiv({ styles: ['feed__date'], text: e.date.toString() });
            const img = createDiv({ styles: ['feed__photo__wrapper'] })
            img.innerHTML = '<img src="../src/img/img-worlds-of-adventure.jpg"/><div'
            const description = createDiv({ styles: ['feed__description'], text: e.description });
            const bottom = createDiv({ styles: ['feed__bottom'] });
            const likes = createDiv({ styles: ['feed__bottom__likes'], text: `Likes · ${e.likes}` });
            bottom.appendChild(likes);

            post.appendChild(author);
            post.appendChild(dateEdit);
            post.appendChild(description);
            post.appendChild(img);
            post.appendChild(bottom);


            this.parent.appendChild(post);
            console.log(post);
        })
    }

};