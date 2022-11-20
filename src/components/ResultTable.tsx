import styled from '@emotion/styled';

import Typo from "./Typo"
import {useCallback, useEffect, useRef} from "react";

type ResultTableProps = {
  responses: Record<string, any>;
}

const TableContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 1280px;
  min-height: 720px;

  background: white;
  
  * {
    box-sizing: border-box;
  }
  
  & > header {
    display: flex;
    align-items: baseline;
    justify-content: center;
    
    gap: 16px;
  }
  
  footer {
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: right;
    
    position: absolute;
    right: 8px; bottom: 8px;
  }

  div.table-area {
    flex: 1;
    display: flex;

    gap: 10px;
    section {
      flex: 1;
      table {
        width: 100%;
        border-collapse: collapse;

        tr, td {
          margin: 0; padding: 0;
          box-sizing: border-box;
        }

        td {
          border: 1px solid black;
        }

      }
    }


  }

  table {
    td {
      height: 42px;
      text-align: center;
    }

    .profile-image {
      width: 130px; height: 160px;
      text-align: center;

      div { width: 130px; height: 160px; background-size: cover; background-position: center center; }
    }

    .header {
      text-align: center;
    }
  }
`


export const ResultTable = ({ responses }: ResultTableProps) => {

  const resolve = useCallback((keyPath: string) => {
    const keys = keyPath.split('.');

    let value = responses;
    while (keys.length > 0) {
      value = value[keys.shift()!];

      if (value === null || value === undefined) {
        return '';
      }
    }

    if (value instanceof Array) {
      return value.join(",");
    }


    return value.toString();
  }, [responses]);

  const resolveCheckbox = useCallback((key: string, checkboxKey: string) => {
    const response = responses[key] as string[] | undefined;
    if (response?.includes(checkboxKey)) {
      return `☑${checkboxKey} `;
    }
    return `☐${checkboxKey} `;
  }, [responses]);

  return (
    <TableContainer id="__result_table__">
      <header>
        <Typo.H1>남성 동성애자 자기 소개서</Typo.H1>
        <Typo.H3>작성일 {new Date().toLocaleDateString()}</Typo.H3>
      </header>
      <div className="table-area">
        <section>
          <table>
            <tbody>
            <tr>
              <td rowSpan={4} className="profile-image">
                { responses['1_photo'] ?
                  <div style={{backgroundImage: `url(${responses['1_photo']})`}} /> : '(사진)' }
              </td>
              <td className="header" rowSpan={3}>이름</td>
              <td className="header">한글</td>
              <td colSpan={2}>
                { resolve('2_name.한글') }
              </td>
              <td className="header">생년월일</td>
              <td>
                { resolve('5_birthday') }
              </td>
            </tr>
            <tr>
              <td className="header">한자</td>
              <td colSpan={2}>
                { resolve('2_name.한자') }
              </td>
              <td className="header">혈액형</td>
              <td>
                { resolve('6_blood_type') }
              </td>
            </tr>
            <tr>
              <td className="header">영문</td>
              <td colSpan={2}>
                { resolve('2_name.영문') }
              </td>
              <td className="header">HIV</td>
              <td className="center">☐양성 ☐음성</td>
            </tr>
            <tr>
              <td className="header">신장</td>
              <td>{ resolve('3_height') || "?" } cm</td>
              <td className="header">체중</td>
              <td>{ resolve('4_weight') || "?" } kg</td>
              <td className="header">현거주지</td>
              <td>{ resolve('8_residence') }</td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td className="header">발기 시 음경 크기</td>
              <td>{ resolve('10_size') || "?" } cm</td>
              <td className="header">포경여부</td>
              <td className="center">
                { resolveCheckbox('11_circum', '포경') }
                { resolveCheckbox('11_circum', '자포') }
                { resolveCheckbox('11_circum', '아직 안 까짐') }
              </td>
            </tr>
            <tr>
              <td className="header">현재 연애는</td>
              <td colSpan={3}>
                { resolveCheckbox('12_relationship', '연애 중') }
                { resolveCheckbox('12_relationship', '애인 구함') }
                { resolveCheckbox('12_relationship', '연애를 원치 않음') }
              </td>
            </tr>
            <tr>
              <td className="header">섹파/fwb 유무</td>
              <td>
                { resolveCheckbox('13_relationship_2', '있음') }
                { resolveCheckbox('13_relationship_2', '없음') }
              </td>
              <td className="header">원하는 연애</td>
              <td>
                { resolveCheckbox('14_relationship_3', '일대일연애') }
                { resolveCheckbox('14_relationship_3', '다자연애') }
                { resolveCheckbox('14_relationship_3', '열린관계') }
              </td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td className="header">최근의 섹스 포지션</td>
              <td>
                { resolveCheckbox('15_position', '탑') }
                { resolveCheckbox('15_position', '올탑') }
                { resolveCheckbox('15_position', '올') }
                { resolveCheckbox('15_position', '올바텀') }
                { resolveCheckbox('15_position', '바텀') }
                { resolveCheckbox('15_position', '비선호') }
              </td>
            </tr>
            <tr>
              <td className="header">원하는 상대의 포지션</td>
              <td>
                { resolveCheckbox('16_position_2', '탑') }
                { resolveCheckbox('16_position_2', '올탑') }
                { resolveCheckbox('16_position_2', '올') }
                { resolveCheckbox('16_position_2', '올바텀') }
                { resolveCheckbox('16_position_2', '바텀') }
                { resolveCheckbox('16_position_2', '비선호') }
                { resolveCheckbox('16_position_2', '상관없음') }
              </td>
            </tr>
            </tbody>
          </table>
          <table>
            <tr>
              <td className="header" rowSpan={2} width="15%">식되는<br />체형</td>
              <td className="header" width="10%">신장</td>
              <td>{ resolve('17_fav.신장') }</td>
              <td className="header" rowSpan={2} width="15%">식에 가까운<br />연예인</td>
              <td rowSpan={2} width="35%">{ resolve('18_fav_2') }</td>
            </tr>
            <tr>
              <td className="header">체중</td>
              <td>{ resolve('17_fav.체중') }</td>
            </tr>
          </table>
          <table>
            <tr>
              <td className="header" rowSpan={2}>내 식은</td>
              <td className="header">근육이</td>
              <td>
                { resolveCheckbox('19_fav_3', '많기를 원함') }
                { resolveCheckbox('19_fav_3', '적당하기를 원함') }
                { resolveCheckbox('19_fav_3', '적기를 원함') }
                { resolveCheckbox('19_fav_3', '상관 없음') }
              </td>
            </tr>
            <tr>
              <td className="header">살이</td>
              <td>
                { resolveCheckbox('20_fav_4', '많기를 원함') }
                { resolveCheckbox('20_fav_4', '적당하기를 원함') }
                { resolveCheckbox('20_fav_4', '적기를 원함') }
                { resolveCheckbox('20_fav_4', '상관 없음') }
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td className="header">나는<br />음주를</td>
              <td>
                { resolveCheckbox('21_drink', '한다') }
                { resolveCheckbox('21_drink', '안 한다') }
                { resolveCheckbox('21_drink', '좋아한다') }
                { resolveCheckbox('21_drink', '안 좋아한다') }
              </td>
              <td className="header">내 애인은<br />음주를</td>
              <td>
                { resolveCheckbox('22_drink_2', '했으면 한다') }
                { resolveCheckbox('22_drink_2', '안 했으면 한다') } <br />
                { resolveCheckbox('22_drink_2', '하건 말건 상관 없다') }
              </td>
            </tr>
            <tr>
              <td className="header">나는<br />흡연을</td>
              <td>
                { resolveCheckbox('24_smoke', '한다') }
                { resolveCheckbox('24_smoke', '안 한다') }
                { resolveCheckbox('24_smoke', '좋아한다') }
                { resolveCheckbox('24_smoke', '안 좋아한다') }
              </td>
              <td className="header">내 애인은<br />흡연을</td>
              <td>
                { resolveCheckbox('25_smoke', '했으면 한다') }
                { resolveCheckbox('25_smoke', '안 했으면 한다') } <br />
                { resolveCheckbox('25_smoke', '하건 말건 상관 없다') }
              </td>
            </tr>
          </table>
        </section>
        <section>
          <table>
            <tbody>
            <tr>
              <td className="header">좋아하는 음악 장르는</td>
              <td width="75%">{ resolve('26_music_genre') }</td>
            </tr>
            <tr>
              <td className="header">좋아하는 영화 장르는</td>
              <td width="75%">{ resolve('27_movie_genre') }</td>
            </tr>
            <tr>
              <td className="header">좋아하는 음식은</td>
              <td width="75%">{ resolve('28_food_like') }</td>
            </tr>
            <tr>
              <td className="header">못 먹는 음식은</td>
              <td width="75%">{ resolve('29_food_dislike') }</td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td className="header">나는 끼가</td>
              <td>
                { resolveCheckbox('30_', '있는 편') }
                { resolveCheckbox('30_', '없는 편') }
              </td>
              <td className="header">나는 애교가</td>
              <td>
                { resolveCheckbox('31_', '있는 편') }
                { resolveCheckbox('31_', '없는 편') }
              </td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td className="header" rowSpan={2}>섹스는</td>
              <td>
                { resolveCheckbox('32_', '만나서 바로 하길 원함') }
                { resolveCheckbox('32_', '조금 알아간 다음에 하길 원함') }<br />
                { resolveCheckbox('32_', '상대방의 요구에 맞추겠음') }
                { resolveCheckbox('32_', '원치 않음 / 하기 싫음') }
              </td>
            </tr>
            <tr>
              <td>
                { resolveCheckbox('33_', '내가 리드하는 것을 좋아함') }
                { resolveCheckbox('33_', '상대가 리드하는 것을 좋아함') }<br />
                { resolveCheckbox('33_', '서로 격렬한 것을 좋아함') }
                { resolveCheckbox('33_', '서로 부드러운 것을 좋아함') }
              </td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td className="header">내가 원하는<br />이상적인 섹스는</td>
              <td width="75%">{ resolve('34_') }</td>
            </tr>
            <tr>
              <td className="header">섹스할 때 정말<br />안 했으면 하는 건</td>
              <td width="75%">{ resolve('35_') }</td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td className="header">바로 직전의 섹스는</td>
              <td>얼마 전: { resolve('36_.얼마 전') }</td>
              <td>누구와: { resolve('36_.누구와') }</td>
              <td>어디에서: { resolve('36_.어디에서') }</td>
            </tr>
            <tr>
              <td className="header">나는 게이인게 티가</td>
              <td colSpan={3}>
                { resolveCheckbox('37_', '나는 편 같다') }
                { resolveCheckbox('37_', '안 나는 편 같다') }
              </td>
            </tr>
            <tr>
              <td className="header">내가 커밍아웃을 한 사람</td>
              <td colSpan={3}>
                { resolveCheckbox('38_', '부모') }
                { resolveCheckbox('38_', '형제') }
                { resolveCheckbox('38_', '친척') }
                { resolveCheckbox('38_', '퀴어 친구') }
                { resolveCheckbox('38_', '비퀴어 친구') }
              </td>
            </tr>
            </tbody>
          </table>

          <p>이상의 내용에 아무 이상이 없음을 민망통계가 확인합니다.</p>
          <footer>
            민망통계 <img src="/minmang.png" />
          </footer>
        </section>
      </div>
    </TableContainer>
  )
}
