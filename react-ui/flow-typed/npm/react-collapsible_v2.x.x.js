// flow-typed signature: 302375edb70e6512d6f3ddb091eab874
// flow-typed version: 5ed28375c1/react-collapsible_v2.x.x/flow_>=v0.54.x

declare module 'react-collapsible' {
  declare type Props = {
    transitionTime?: number,
    transitionCloseTime?: number,
    triggerTagName?: string,
    easing?: string,
    open?: boolean,
    classParentString?: string,
    openedClassName?: string,
    triggerStyle?: Object,
    triggerClassName?: string,
    triggerOpenedClassName?: string,
    contentOuterClassName?: string,
    contentInnerClassName?: string,
    accordionPosition?: string | number,
    handleTriggerClick?: (accordionPosition?: string | number) => void,
    onOpen?: () => void,
    onClose?: () => void,
    onOpening?: () => void,
    onClosing?: () => void,
    trigger: string | React$Element<*>,
    triggerWhenOpen?: string | React$Element<*>,
    triggerDisabled?: boolean,
    lazyRender?: boolean,
    overflowWhenOpen?: 'hidden' | 'visible' | 'auto' | 'scroll' | 'inherit' | 'initial' | 'unset',
    triggerSibling?: string | React$Element<*> | (() => React$Node),
    tabIndex?: number,
  };

  declare class Collapsible extends React$Component<Props> {}
  declare module.exports: typeof Collapsible;
}
