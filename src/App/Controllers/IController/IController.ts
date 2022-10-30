import IView from '../../Views/IView/IView'
import IModel from '../../Models/IModel/IModel'


/**
 * Базовый класс для контроллера компонента приложения.
 * Связывает вид с моделью
 * @class 
 * @virtual
 * @param  {tView<IView>} view Вид, которым управляет контроллер
 * @param  {tModel<IModel>} model Модель, которой пользуется контроллер
 */
abstract class IController<tView extends IView, tModel> {
    /**
     * Вид, которым управляет контроллер
     * @protected
     */
    protected view: tView;

    /**
     * Модель, которой пользуется контроллер
     * @protected
     */
    protected model: tModel;

    /**
     * Флаг. Отображается ли данный компонент на странице
     * @protected
     */
    protected isMounted: boolean;
    
    constructor(view: tView, model: tModel) {
        this.view = view;
        this.model = model;
        this.isMounted = false; 
    }
    
    /**
     * Функция устрановки компонента.
     * Отрисовывает элемент и управляет им.
     * @return {void}
     */
    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
        }
    }

    /**
     * Функция убирания компонента.
     * Отрисовывает элемент и управляет им.
     * @return {void}
     */
    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.isMounted = false;
        }
    }
}

export default IController;