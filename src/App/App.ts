import baseTemplate from "./Components/Base/Base.hbs";
import "./App.scss"
import "./Components/Base/Base.scss"

import router from "./Router/Router";
import paths from "./Router/RouterPaths";
import EventDispatcher from "./Modules/EventDispatcher/EventDispatcher";

import PageNotFoundView from "./Views/PageNotFoundView/PageNotFoundView";
import PageNotFoundController from "./Controllers/PageNotFoundController/PageNotFoundController";

import SigninView from "./Views/SigninView/SigninView";
import SigninController from "./Controllers/SigninController/SigninController";

import SignupView from "./Views/SignupView/SignupView";
import SignupController from "./Controllers/SignupController/SignupController";

import MenuView from "./Views/MenuView/MenuView";
import MenuController from "./Controllers/MenuController/MenuController";

import FeedView from "./Views/FeedView/FeedView";
import FeedController from "./Controllers/FeedController/FeedController";

import HeaderView from "./Views/HeaderView/HeaderView";
import HeaderController from "./Controllers/HeaderController/HeaderController";

import FooterView from "./Views/FooterView/FooterView";
import FooterController from "./Controllers/FooterController/FooterController";

import UserModel from "./Models/UserModel/UserModel";
import FeedModel from "./Models/FeedModel/FeedModel";
import MessengerModel from "./Models/MessengerModel/MessengerModel";


import ProfileController from "./Controllers/ProfileController/ProfileController";
import ProfileView from "./Views/ProfileView/ProfileView";

import SettingsController from "./Controllers/SettingsController/SettingsController";
import SettingsView from "./Views/SettingsView/SettingsView";


import FriendsView from "./Views/FriendsView/FriendsView";
import FriendsController from "./Controllers/FriendsController/FriendsController";

import MessengerController from "./Controllers/MessengerController/MessengerController";
import MessengerView from "./Views/MessengerView/MessengerView";

import ChatView from "./Views/ChatView/ChatView";
import ChatController from "./Controllers/ChatController/ChatController";

import CommunityListView from "./Views/CommunityListView/CommunityListView";
import CommunityView from "./Views/CommunityView/CommunityView";
import CommunityModel from "./Models/CommunityModel/CommunityModel";
import CommunityListController from "./Controllers/CommunityListController/CommunityListController";
import CommunityController from "./Controllers/CommunityController/CommunityController";

import AboutWSView from "./Views/AboutWSView/AboutWSView";
import AboutWSController from "./Controllers/AboutWSController/AboutWSController";

/**
 * Приложение Write&Send
 * @category Application
 */
class App {
    // Views
    private signinView: SigninView;
    private signupView: SignupView;
    private menuView: MenuView;
    private feedView: FeedView;
    private headerView: HeaderView;
    private footerView: FooterView;
    private pageNotFoundView: PageNotFoundView;
    private profileView: ProfileView;
    private settingsView: SettingsView;
    private friendsView: FriendsView;
    private messengerView: MessengerView;
    private chatView: ChatView;
    private communityListView: CommunityListView;
    private communityView: CommunityView;
    private aboutWSView: AboutWSView;

    // Models
    private userModel: UserModel;
    private feedModel: FeedModel;
    private messengerModel: MessengerModel;
    private communityModel: CommunityModel;

    // Controllers
    private signinController: SigninController;
    private signupController: SignupController;
    private menuController: MenuController;
    private feedController: FeedController;
    private headerController: HeaderController;
    private footerController: FooterController;
    private pageNotFoundController: PageNotFoundController;
    private profileController: ProfileController;
    private settingsController: SettingsController;
    private friendsController: FriendsController;
    private messengerController: MessengerController;
    private chatController: ChatController;
    private communityListController: CommunityListController;
    private communityController: CommunityController;
    private aboutWSController: AboutWSController;

    // Elements
    private root: HTMLElement;
    private header: HTMLElement;
    private footer: HTMLElement;
    private leftSide: HTMLElement;
    private rightSide: HTMLElement;
    private content: HTMLElement;

    constructor() {
        // this.initPrefferedColorTheme();
        this.initPage();
        this.initViews();
        this.initModels();
        this.initControllers();
        this.initRoutes();
    }

    /**
     * Запуск приложения
     * @param {string} url - Адрес запрашиваемой страницы.
     * @return {void}
     */
    public run(url: string): void {
        router.start(url);
    }

    // Redirects

    /**
     * Функция отрабатывает переход по URL авторизации
     * (приватное поле класса)
     * @return {void}
     */
    private handleRedirectToSignin(): void {
        this.userModel.authUserByCookie()
            .then(() => {
                router.goToPath(paths.feedPage);
            })
            .catch(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.signinPage);
                // mount
                this.headerController.mountComponent();
                this.footerController.mountComponent();
                this.signinController.mountComponent();
                // states
                this.headerView.changeHeaderItem('signupButton');
            });
    }

    /**
     * Функция отрабатывает переход по URL регистрации
     * (приватное поле класса)
     * @return {void}
     */
    private handleRedirectToSignup(): void {
        this.userModel.authUserByCookie()
            .then(() => {
                router.goToPath(paths.feedPage);
            })
            .catch(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.signupPage);
                // mount
                this.headerController.mountComponent();
                this.footerController.mountComponent();
                this.signupController.mountComponent();
                // states
                this.headerView.changeHeaderItem('signinButton');
            });
    }

    /**
     * Функция отрабатывает переход по URL ленты
     * (приватное поле класса)
     * @return {void}
     */
    private handleRedirectToFeed(): void {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.feedPage);
                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();
                this.feedController.setFeedContent({});
                this.feedController.mountComponent();
            })
            .catch(() => {
                router.goToPath(paths.aboutWS);
            });
    }

    /**
     * Функция отрабатывает переход по URL выхода
     * (приватное поле класса)
     * @return {void}
     */
    private handleLogout(): void {
        EventDispatcher.emit('redirect', paths.logout);

        this.userModel.logoutUser();
        router.goToPath(paths.signinPage);
    }

    /**
     * Функция отрабатывает переход по незнакомому URL
     * (приватное поле класса)
     * @return {void}
     */
    private handle404(): void {
        EventDispatcher.emit('unmount-all');
        EventDispatcher.emit('redirect', '404');
        this.headerController.mountComponent();
        this.footerController.mountComponent();
        this.pageNotFoundController.mountComponent();
    }

    /**
     * Функция отрабатывает переход на страницу профиля пользователя
     * (приватное поле класса)
     * @return {void}
     */
    private handleProfile(data: any): void {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.profile);

                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();
                this.profileController.mountComponent();

                // Если без параметров - наш профиль
                let userId: number | string = this.userModel.getCurrentUser()?.id ?? -1;

                // Если есть параметр, достаем его
                if (data && data[0]) {
                    userId = data[0]; // Если передали id, то профиль юзера
                }

                if (!userId || userId === -1) {
                    // console.log('App: show profile- current user null');
                    return;
                }

                this.profileController.changeProfileUser(userId)
                    .then(() => {
                        // Нарисовали профиль

                        // Рисуем фид юзера
                        this.feedController.setFeedContent({
                            user: {
                                id: userId,
                            },
                        });
                        this.feedController.mountComponent();
                    })
                    .catch(() => {
                        // Что-то пошло не так, то 404
                        router.showUnknownPage();
                    });
            })
            .catch(() => {
                router.goToPath(paths.signinPage);
            });
    }

    /**
     * Функция отрабатывает переход на страницу настроек профиля
     * (приватное поле класса)
     * @return {void}
     */
    private handleSettings(): void {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.profile);
                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();
                this.settingsController.mountComponent();
            })
            .catch(() => {
                router.goToPath(paths.signinPage);
            });
    }

    private handleRedirectToFriends(): void {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.friends);
                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();
                this.friendsController.mountComponent();
            })
            .catch(() => {
                router.goToPath(paths.signinPage);
            });
    }


    private handleMessenger(): void {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.messenger);
                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();
                this.messengerController.mountComponent();
                this.messengerController.updateDialogs();
            })
            .catch(({ status, body }) => {
                router.goToPath(paths.signinPage);
            });
    }


    private handleChat(data: any) {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.chat);

                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();

                // Если есть параметр, достаем его
                if (!data || !data[0]) {
                    router.showUnknownPage();
                    return;
                }

                const userId = data[0];
                this.chatController.mountComponent({ byUserId: userId.toString() });
            })
            .catch(() => {
                router.goToPath(paths.signinPage);
            });
    }

    private handleCommunities(): void {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.communities);

                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();

                this.communityListController.mountComponent();
            })
            .catch(() => {
                router.goToPath(paths.signinPage);
            });
    }

    private handleCommunityPage(data: any): void {
        this.userModel.authUserByCookie()
            .then(() => {
                EventDispatcher.emit('unmount-all');
                EventDispatcher.emit('redirect', paths.community);

                // mount
                this.headerController.mountComponent();
                this.menuController.mountComponent();

                // Если есть параметр, достаем его
                if (!data || !data[0]) {
                    router.showUnknownPage();
                    return;
                }

                const communityId = data[0];
                this.communityController.mountComponent(communityId);

                // Рисуем фид сообщества
                this.feedController.setFeedContent({
                    group: {
                        id: communityId,
                    },
                });
                this.feedController.mountComponent();
            })
            .catch(() => {
                router.goToPath(paths.signinPage);
            });
    }

    private handleAboutWS(): void {
        EventDispatcher.emit('unmount-all');
        EventDispatcher.emit('redirect', paths.feedPage);
        // mount
        this.headerController.mountComponent();
        this.headerView.changeHeaderItem('signupButton');
        this.aboutWSController.mountComponent();
        this.footerController.mountComponent();
    }
    /**
     * Функция инициализирует базовую вёрстку страницы
     * (приватное поле класса)
     * @return {void}
     */
    private initPage(): void {
        document.body.innerHTML = baseTemplate({});
        this.root = <HTMLElement>document.body.querySelector('#root');
        this.header = <HTMLElement>document.body.querySelector('#header');
        this.footer = <HTMLElement>document.body.querySelector('#footer');
        this.leftSide = <HTMLElement>document.body.querySelector('#left-menu');
        this.rightSide = <HTMLElement>document.body.querySelector('#right-menu');
        this.content = <HTMLElement>document.body.querySelector('#main');
    }

    /**
     * Функция инициализирует отображения страниц
     * (приватное поле класса)
     * @return {void}
     */
    private initViews(): void {
        this.signinView = new SigninView(this.content);
        this.signupView = new SignupView(this.content);
        this.menuView = new MenuView(this.leftSide);
        this.feedView = new FeedView(this.content);
        this.headerView = new HeaderView(this.header);
        this.footerView = new FooterView(this.footer);
        this.pageNotFoundView = new PageNotFoundView(this.content);
        this.profileView = new ProfileView(this.content);
        this.settingsView = new SettingsView(this.content);
        this.friendsView = new FriendsView(this.content);
        this.messengerView = new MessengerView(this.content);
        this.chatView = new ChatView(this.content);
        this.communityListView = new CommunityListView(this.content);
        this.communityView = new CommunityView(this.content);
        this.aboutWSView = new AboutWSView(this.content);
    }

    /**
     * Функция инициализирует модели страниц
     * (приватное поле класса)
     * @return {void}
     */
    private initModels(): void {
        this.userModel = new UserModel();
        this.feedModel = new FeedModel();
        this.messengerModel = new MessengerModel();
        this.communityModel = new CommunityModel();
    }

    /**
     * Функция инициализирует котроллеры страниц
     * (приватное поле класса)
     * @return {void}
     */
    private initControllers(): void {
        this.signinController =
            new SigninController(this.signinView, this.userModel);
        this.signupController =
            new SignupController(this.signupView, this.userModel);
        this.menuController = new MenuController(this.menuView);
        this.feedController = new FeedController(this.feedView, this.feedModel);
        this.headerController =
            new HeaderController(this.headerView);
        this.footerController = new FooterController(this.footerView);
        this.pageNotFoundController =
            new PageNotFoundController(this.pageNotFoundView);
        this.profileController = new ProfileController(this.profileView, this.userModel);
        this.settingsController = new SettingsController(this.settingsView, this.userModel);
        this.friendsController = new FriendsController(this.friendsView, this.userModel);
        this.messengerController = new MessengerController(this.messengerView, { user: this.userModel, messenger: this.messengerModel });
        this.chatController = new ChatController(this.chatView, { user: this.userModel, messenger: this.messengerModel });
        this.communityListController = new CommunityListController(this.communityListView, { community: this.communityModel, user: this.userModel });
        this.communityController = new CommunityController(this.communityView, { community: this.communityModel, user: this.userModel });
        this.aboutWSController = new AboutWSController(this.aboutWSView);
    }

    /**
     * Функция задаёт связи между страницами (URL -> обработчик)
     * (приватное поле класса)
     * @return {void}
     */
    private initRoutes(): void {
        router.setUnknownPageHandler(this.handle404.bind(this));
        router.addRule(paths.signinPage, this.handleRedirectToSignin.bind(this));
        router.addRule(paths.signupPage, this.handleRedirectToSignup.bind(this));
        router.addRule(paths.feedPage, this.handleRedirectToFeed.bind(this));
        router.addRule(paths.logout, this.handleLogout.bind(this));
        router.addRule(paths.home, this.handleRedirectToFeed.bind(this));
        router.addRule(paths.profile, this.handleProfile.bind(this));
        router.addRule(paths.settings, this.handleSettings.bind(this));
        router.addRule(paths.friends, this.handleRedirectToFriends.bind(this));
        router.addRule(paths.userProfie, this.handleProfile.bind(this));
        router.addRule(paths.messenger, this.handleMessenger.bind(this));
        router.addRule(paths.chat, this.handleChat.bind(this));
        router.addRule(paths.communities, this.handleCommunities.bind(this));
        router.addRule(paths.community, this.handleCommunityPage.bind(this));
        router.addRule(paths.aboutWS, this.handleAboutWS.bind(this));
    }
}

export default App;