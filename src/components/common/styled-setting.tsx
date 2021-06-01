import { Colors } from '@blueprintjs/core';
import styled from 'styled-components';
import { COLORS } from '../../utils';

export const SettingTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const SettingItem = styled.span`
  margin: 0 10px 0 2px;
`;

export const SettingBoxContainer = styled.div`
  padding: 10px;
  margin: 0 0 10px 0;
  //border: rgba(16, 22, 26, 0.15) solid 1px;
  border-radius: 5px;

  background: ${COLORS.LIGHT.CONTAINER_BG};

  .bp3-dark & {
    background: ${COLORS.DARK.CONTAINER_BG};
  }
`;

export const SettingLabel = styled(SettingItem)``;

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  //justify-content: center;
  margin: 5px 0;
`;

export const SettingRowTitle = styled.div`
  margin: 0 5px 0 0;
  width: 88px;
`;

export const ColorBar = styled.div`
  height: 3px;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 2px;
  background: ${props => props.color};
`;

export const WithBorder = styled.div`
  border: 1px solid grey;
  cursor: pointer;
  font-weight: bold;
`;
