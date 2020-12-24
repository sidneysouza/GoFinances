import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  background: ${lighten(0.95, '#000')};
  padding: 10px 30px;
  border-radius: 5px;
  justify-content: space-between;

  button {
    border: 0;
    background: transparent;
    color: #e83f5b;
    margin-left: 10px;
    cursor: pointer;
  }

  div {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: space-between;

    strong {
      margin-left: 10px;
      font-size: 14px;
    }

    span {
      display: flex;
      flex-direction: column;

      font-size: 12px;
      color: #999;

      img {
        width: 30px;
      }
    }
  }
`;
