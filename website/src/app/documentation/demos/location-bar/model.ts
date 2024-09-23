import { NodeId } from '@porscheinformatik/clr-addons';

export class DemoLocationBarNodeId extends NodeId {
  constructor(public id: string) {
    super();
  }

  equals(other: DemoLocationBarNodeId): boolean {
    return this.id === other.id;
  }
}

export class DemoLocationBarComplexNodeId extends NodeId {
  constructor(public id: string, public name: string, public code: string) {
    super();
  }

  equals(other: DemoLocationBarComplexNodeId): boolean {
    return this.id === other.id && this.name === other.name && this.code === other.code;
  }
}
