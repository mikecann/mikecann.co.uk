import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { Modal } from "../Modal";

interface Props {}

export const SearchModal: React.FC<Props> = ({}) => {
  return <Modal>
    <Horizontal>
      <input />
    </Horizontal>
  </Modal>;
};
