import { LocationBarNode, NodeId } from '@porscheinformatik/clr-addons';

export interface SearchResponseModel<T extends NodeId> {
  text?: string;
  searchableNodes?: LocationBarNode<T>[];
}
