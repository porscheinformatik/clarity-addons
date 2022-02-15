import { NodeId } from "@porscheinformatik/clr-addons";

export class DemoLocationBarNodeId extends NodeId {
  constructor(public id: string) {
    super();
  }

  equals(other: DemoLocationBarNodeId): boolean {
    return this.id === other.id;
  }
}
