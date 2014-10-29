rg.registerClass('ImageView', function ImageView(props, $RV_View) {
    RV.extend(this, $RV_View);
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
    this._render = function () {
        return <RV>
            <div style="overflow:hidden;background-image: url('images/default.gif'); padding:2px; border:1px solid black;background-repeat: no-repeat;background-position: center;">
                <img width="{width}" height="{height}" ref="img"/>
            </div>
        </RV>;
    };
});