import * as React from 'react';

import {
  Controller,
  DocModel,
  KeyType,
  SheetModel,
  Topic,
  TopicStyle
} from '@blink-mind/core';

export interface BaseProps {
  docModel: DocModel;
  model: SheetModel;
  key?: string;
  topicKey?: KeyType;
  topic?: Topic;
  readOnly?: boolean;
  topicStyle?: TopicStyle;
  controller?: Controller;
  dir?: string;
  saveRef?: Function;
  getRef?: Function;
  setViewBoxScrollDelta?: Function;
  setViewBoxScroll?: Function;
  zoomFactor?: number;
  zIndex?: number;
  diagramState: any;
  setDiagramState: (any) => void;
}

export class BaseWidget<
  P extends BaseProps = BaseProps,
  S = any
> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  operation(opType: string, arg: any) {
    this.props.controller.run('operation', {
      opType,
      ...arg
    });
  }

  run(name: string, arg: any) {
    this.props.controller.run(name, arg);
  }

  get topic() {
    return this.props.model.getTopic(this.props.topicKey);
  }
}
