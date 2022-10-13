const source = `
<div id="root">
    <div id="header"></div>
    <div id="content">
        <div class="left-menu"></div>
        <div class="main-content"></div>
        <div class="right-menu"></div>
    </div>
    <div id="footer">
    
        <!-- Template -->
        <div class="footer__container">
          <img id="" src="../src/img/footer_logo.png" class="footer__logo" />
          <div class="contacts">
            Contacts:<a id="" href="tel:555-555-5555" class="contacts__item"
              ><img
                id=""
                src="../src/img/phone_icon.svg"
                class="contacts__item__icon"
            /></a>
          </div>
          <div class="company-name">TikTikAndVProd2022</div>
        </div>
        <!--  -->
        </div>
</div>
`;

const baseTemplate = Handlebars.compile(source);

export default baseTemplate;