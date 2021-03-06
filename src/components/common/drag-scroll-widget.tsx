import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import styled from 'styled-components';

import debug from 'debug';
const log = debug('node:drag-scroll-widget');

const DragScrollView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const DragScrollContent = styled.div`
  position: relative;
  width: max-content;
`;

const useWindowListener = false;

interface DragScrollWidgetProps {
  mouseKey?: 'left' | 'right';
  needKeyPressed?: boolean;
  canDragFunc?: () => Boolean;
  enableMouseWheel: boolean;
  children: (
    setViewBoxScroll: (left: number, top: number) => void,
    setViewBoxScrollDelta: (left: number, top: number) => void
  ) => React.ReactNode;
}

export class DragScrollWidget extends React.Component<
  DragScrollWidgetProps,
  any
> {
  constructor(props: DragScrollWidgetProps) {
    super(props);
    this.state = {
      widgetStyle: {
        width: '10000px',
        height: '10000px'
      }
    };
  }

  static defaultProps = {
    mouseKey: 'left',
    needKeyPressed: false
  };

  contentResizeCallback = (
    entries: ResizeObserverEntry[],
    observer: ResizeObserver
  ) => {
    // log('contentResizeCallback', entries[0].contentRect, this.oldContentRect);
    // if (entries[0].contentRect.width === 0 ) return;
    log('contentResizeCallback');
    if (this.oldContentRect) {
      const widgetStyle = {
        width: this.content.clientWidth + this.viewBox.clientWidth * 2,
        height: this.content.clientHeight + this.viewBox.clientHeight * 2
      };
      this.bigView.style.width = widgetStyle.width + 'px';
      this.bigView.style.height = widgetStyle.height + 'px';
    }
    this.oldContentRect = entries[0].contentRect;
  };

  contentResizeObserver = new ResizeObserver(this.contentResizeCallback);
  // oldScroll: { left: number; top: number };
  oldContentRect: any;
  content: HTMLElement;
  contentRef = ref => {
    log('contentRef');
    if (ref) {
      this.content = ref;
      this.oldContentRect = this.content.getBoundingClientRect();
      this.contentResizeObserver.observe(this.content);
    }
  };

  viewBox: HTMLElement;
  viewBoxRef = ref => {
    if (ref) {
      this.viewBox = ref;
      if (!this.props.enableMouseWheel) {
        log('addEventListener onwheel');
        this.viewBox.addEventListener(
          'wheel',
          function(e) {
            log('onwheel');
            (e.ctrlKey || e.metaKey) && e.preventDefault();
          },
          {
            passive: false
          }
        );
      }
      this.setViewBoxScroll(
        this.viewBox.clientWidth,
        this.viewBox.clientHeight
      );
    }
  };

  bigView: HTMLElement;
  bigViewRef = ref => {
    if (ref) {
      this.bigView = ref;
    }
  };

  setWidgetStyle = () => {
    log('setWidgetStyle');
    if (this.content && this.viewBox && this.bigView) {
      this.bigView.style.width =
        (this.content.clientWidth + this.viewBox.clientWidth) * 2 + 'px';
      this.bigView.style.height =
        (this.content.clientHeight + this.viewBox.clientHeight) * 2 + 'px';

      this.content.style.left = this.viewBox.clientWidth + 'px';
      this.content.style.top = this.viewBox.clientHeight + 'px';
    }
  };

  setViewBoxScroll = (left: number, top: number) => {
    log(`setViewBoxScroll ${left} ${top}`);
    if (this.viewBox) {
      this.viewBox.scrollLeft = left;
      this.viewBox.scrollTop = top;
    }
  };

  setViewBoxScrollDelta = (deltaLeft: number, deltaTop: number) => {
    log(
      `setViewBoxScrollDelta ${deltaLeft} ${deltaTop} ${this.viewBox
        .scrollLeft + deltaLeft} ${this.viewBox.scrollTop + deltaTop}`
    );
    if (this.viewBox) {
      this.viewBox.scrollLeft += deltaLeft;
      this.viewBox.scrollTop += deltaTop;
    }
  };

  onMouseDown = e => {
    log('onMouseDown');
    // log(e.nativeEvent.target);

    // mouseKey ?????????????????????????????????????????????????????????????????????
    // needKeyPressed ??????????????????????????????ctrl???????????????????????????
    // canDragFunc???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    const { mouseKey, needKeyPressed, canDragFunc } = this.props;
    if (canDragFunc && !canDragFunc()) return;
    if (
      (e.button === 0 && mouseKey === 'left') ||
      (e.button === 2 && mouseKey === 'right')
    ) {
      if (needKeyPressed) {
        if (!e.ctrlKey) return;
      }
      this._lastCoordX = this.viewBox.scrollLeft + e.nativeEvent.clientX;
      this._lastCoordY = this.viewBox.scrollTop + e.nativeEvent.clientY;

      const ele = useWindowListener ? window : this.viewBox;
      ele.addEventListener('mousemove', this.onMouseMove);
      ele.addEventListener('mouseup', this.onMouseUp);
    }
  };

  onMouseUp = e => {
    log('onMouseUp');
    const ele = useWindowListener ? window : this.viewBox;
    ele.removeEventListener('mousemove', this.onMouseMove);
    ele.removeEventListener('mouseup', this.onMouseUp);
  };

  // _lastCoordX???_lastCorrdY ??????????????????????????? ?????? viewBox???scrollLeft???scrollTop?????????
  // _lastCoordX???_lastCorrdY ???????????????????????????viewBox???scroll?????????????????????
  _lastCoordX: number;
  _lastCoordY: number;

  onMouseMove = (e: MouseEvent) => {
    this.viewBox.scrollLeft = this._lastCoordX - e.clientX;
    this.viewBox.scrollTop = this._lastCoordY - e.clientY;
    // log(`onMouseMove ${this.viewBox.scrollLeft} ${this.viewBox.scrollTop}`);
  };

  handleContextMenu = e => {
    e.preventDefault();
  };

  componentDidMount(): void {
    this.setWidgetStyle();
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.handleContextMenu);
  }

  setZoomFactor(zoomFactor) {
    this.bigView.style.transform = `scale(${zoomFactor})`;
    this.bigView.style.transformOrigin = '50% 50%';
  }

  render() {
    // log('render');
    const style = {
      ...this.state.widgetStyle
      // zoom:this.props.zoomFactor,
      // transform: `scale(${this.props.zoomFactor})`,
      // transformOrigin: '50% 50%'
    };
    return (
      <DragScrollView ref={this.viewBoxRef} onMouseDown={this.onMouseDown}>
        <div style={style} ref={this.bigViewRef}>
          <DragScrollContent
            ref={this.contentRef}
            style={this.state.contentStyle}
          >
            {this.props.children(
              this.setViewBoxScroll,
              this.setViewBoxScrollDelta
            )}
          </DragScrollContent>
        </div>
      </DragScrollView>
    );
  }
}
