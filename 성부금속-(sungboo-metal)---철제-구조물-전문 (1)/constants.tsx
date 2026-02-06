
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  config: {
    siteName: '성부금속 (Sungboo Metal)',
    tagline: '철의 견고함에 예술적 가치를 더합니다.',
    primaryColor: '#D4AF37', // Classic Gold
    secondaryColor: '#FFFFFF',
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
    contactEmail: 'contact@sungboometal.com',
    contactPhone: '010-2243-0481',
    address: '경기 고양시 덕양구 보광로 179-18',
    socialLinks: {
      instagram: 'https://instagram.com/sungboo',
      naver: 'https://blog.naver.com/sungboo1211'
    },
    seo: {
      title: '성부금속 - 철계단 및 철구조물 제작 전문',
      description: '품격 있는 디자인과 최고의 기술력으로 완성하는 철제 계단 및 구조물 전문 성부금속입니다.',
      keywords: '철계단, 철구조물, 인테리어계단, 성부금속, 금속공사'
    }
  },
  posts: [
    {
      id: '1',
      title: '[시공사례] 강남 단독주택 모던 철제 계단 및 유리 난간 시공',
      category: '계단',
      content: '강남구 논현동에 위치한 단독주택 내부 계단 시공 현장입니다. 화이트 톤의 인테리어에 어울리는 슬림한 철제 프레임과 강화유리 난간으로 개방감을 높였습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800',
      date: '2024-03-24',
      isPublished: true,
      externalUrl: 'https://blog.naver.com/sungboo1211/223391214000'
    },
    {
      id: '2',
      title: '평택 물류창고 대규모 철구조물 및 복층 공사 완료',
      category: '철구조물',
      content: '공간 활용도를 극대화하기 위한 H빔 구조의 복층 공사 프로젝트입니다. 철저한 하중 계산과 정밀한 용접 공정으로 안전성을 최우선으로 작업하였습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
      date: '2024-03-20',
      isPublished: true,
      externalUrl: 'https://blog.naver.com/sungboo1211/223388000000'
    },
    {
      id: '3',
      title: '양평 전원주택 자동화 대문 및 펜스 디자인 제작',
      category: '대문',
      content: '주택의 첫인상을 결정짓는 대문 시공입니다. 레이저 커팅 공법을 활용한 독창적인 패턴 디자인과 내구성이 강한 분체 도장으로 마무리하였습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800',
      date: '2024-03-15',
      isPublished: true,
      externalUrl: 'https://blog.naver.com/sungboo1211'
    },
    {
      id: '4',
      title: '카페 루프탑 야외 철제 계단 및 안전 난간 설치',
      category: '난간',
      content: '성수동 카페 옥상으로 이어지는 야외 계단입니다. 외부 노출을 고려하여 아연 도금 처리를 거친 후 다크 그레이 컬러로 도장하여 부식을 방지하고 세련미를 더했습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
      date: '2024-03-10',
      isPublished: true,
      externalUrl: 'https://blog.naver.com/sungboo1211'
    },
    {
      id: '5',
      title: '복층 오피스 인테리어 금속 공사 - 블랙 파이프 가림막',
      category: '복층공사',
      content: '모던한 오피스 분위기에 맞춘 금속 인테리어 작업입니다. 수직 파이프 디자인을 활용한 파티션과 복층 구조를 통해 감각적인 업무 공간을 조성했습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      date: '2024-03-05',
      isPublished: true,
      externalUrl: 'https://blog.naver.com/sungboo1211'
    },
    {
      id: '6',
      title: '고급 신축 빌라 메인 현관 금속 대문 및 도어 시공',
      category: '대문',
      content: '중후한 느낌을 주는 대형 스틸 도어 시공 사례입니다. 금색 포인트 손잡이와 무게감 있는 프레임으로 건물의 품격을 한층 높여주는 결과물을 만들었습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1517315003714-a071486bd9ea?auto=format&fit=crop&q=80&w=800',
      date: '2024-03-01',
      isPublished: true,
      externalUrl: 'https://blog.naver.com/sungboo1211'
    }
  ]
};
