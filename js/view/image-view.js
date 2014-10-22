var ImageView = function (props) {
    console.log(props);
    RV.extend(this, RV.View);
    props = props||{};
    var src = props.src||'',
        width = props.width||'100px',
        height = props.height||'100px';

    this.onRenderAfter = function () {
        this.refs.img.addEventListener('load', this._onImgLoad);
        this.setSRC();
    };

    this._onImgLoad = function () {
        this.refs.img.style.visibility = 'visible';
    }.bind(this);


    this.setSRC = function (arg) {
        if (src !== arg) {
            src = arg;
            this.refs.img.style.visibility = 'hidden';
            this.refs.img.src = src;
        }
    };
    // TODO: create JSX compiler
    this._render = function () {
        return eval(RV.DOM2RV.parseString(
        '<div style="overflow:hidden;background-image: url(\'images/default.gif\'); padding:2px; border:1px solid black;background-repeat: no-repeat;background-position: center;">' +
            '<img width="{width}" height="{height}" ref="img"/>' +
        '</div>'));
    };
};