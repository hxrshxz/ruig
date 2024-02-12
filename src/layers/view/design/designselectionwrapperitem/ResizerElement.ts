import { MAX_Z_INDEX } from "../../../../common/constants"
import NullException from "../../../../common/exceptions/NullException"
import IAnyObject from "../../../../common/models/IAnyObject"
import BaseComponent from "../../application/components/base/BaseComponent"
import DesignElement from "../DesignElement"
import DesignSelectionWrapperItem from "./DesignSelectionWrapperItem"
import LeftElement from "./LeftElement copy 2"
import BottomElement from "./resizing/BottomElement"
import BottomLeftElement from "./resizing/BottomLeftElement"
import BottomRightElement from "./resizing/BottomRightElement"
import CenterItem from "./resizing/CenterItem"
import RightElement from "./resizing/RightElement"
import TopElement from "./resizing/TopElement"
import TopLeftElement from "./resizing/TopLeftElement"
import TopRightElement from "./resizing/TopRightElement"

class ResizerElement extends BaseComponent {
    private centerElement: DesignSelectionWrapperItem = new CenterItem as DesignSelectionWrapperItem
    private topRightElement: DesignSelectionWrapperItem = new TopRightElement as DesignSelectionWrapperItem
    private bottomRightElement: DesignSelectionWrapperItem = new BottomRightElement as DesignSelectionWrapperItem
    private bottomLeftElement: DesignSelectionWrapperItem = new BottomLeftElement as DesignSelectionWrapperItem
    private topLeftElement: DesignSelectionWrapperItem = new TopLeftElement as DesignSelectionWrapperItem
    private topElement: DesignSelectionWrapperItem = new TopElement as DesignSelectionWrapperItem
    private leftElement: DesignSelectionWrapperItem = new LeftElement as DesignSelectionWrapperItem
    private bottomElement: DesignSelectionWrapperItem = new BottomElement as DesignSelectionWrapperItem
    private rightElement: DesignSelectionWrapperItem = new RightElement as DesignSelectionWrapperItem

    private wrappedElement!: DesignElement;
    initialBorder: any

    constructor(style?: IAnyObject) {
        super({
            background: 'transparent',
            border: '0.5px solid red',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...(style ?? {}),
            'z-index': MAX_Z_INDEX,
        });
        this.appendChildren(
            this.centerElement,

            this.topElement,
            this.leftElement,
            this.bottomElement,
            this.rightElement,

            this.topRightElement,
            this.bottomLeftElement,
            this.bottomRightElement,
            this.topLeftElement,
            
        )
    }

    setElementToWrap(element: DesignElement): void {
        if (!element) {
            throw new NullException
        }
        this.wrappedElement = element

        this.updateSize(element)

        this.topRightElement.setWrapper(this)
        this.bottomRightElement.setWrapper(this)
        this.bottomLeftElement.setWrapper(this)
        this.topLeftElement.setWrapper(this)
        this.topElement.setWrapper(this)
        this.leftElement.setWrapper(this)
        this.bottomElement.setWrapper(this)
        this.rightElement.setWrapper(this)
        this.centerElement.setWrapper(this)
    }

    updateSize(element: DesignElement) {
        let width = element.clientWidth
        let height = element.clientHeight

        this.style.width = (width + 15) + 'px'
        this.style.height = (height + 15) + 'px'
    }

    getWrappedElement() {
        return this.wrappedElement
    }

    hide() {
        this.initialBorder = this.style.border
        this.style.border = '0'
        this.rotatorElement.style.display = 'none'
        this.translatorElement.style.display = 'none'
    }

    show() {
        this.style.border = this.initialBorder
        this.rotatorElement.style.display = 'initial'
        this.translatorElement.style.display = 'initial'
    }
}

export { ResizerElement as DesignElementWrapper }

export default (ResizerElement);
