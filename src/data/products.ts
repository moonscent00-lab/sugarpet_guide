export interface Product {
    id: string;
    brand: string;
    name: string;
    description: string;
    kcalPerKg: number;
    kibbleSize?: string;
    keyIngredients?: string;
    petType: 'dog' | 'cat';
    tags?: string[];
    imageUrl?: string;
}

export const PRODUCTS: Product[] = [
    // --- DOG FOOD (21 Items) ---
    {
        id: 'atomy-dog-salmon',
        brand: '애터미',
        name: '애터미 헤이 독 연어',
        description: '오메가3 듬뿍, 피모 건강 및 눈물 자국 개선. 육류 알러지 최소화, 200g 개별 소포장.',
        kcalPerKg: 3500,
        keyIngredients: '가수분해 연어, 유기농 원료',
        petType: 'dog',
        tags: ['가수분해', '유기농', '눈물자국개선', '알러지'],
        imageUrl: 'https://i.postimg.cc/hj2FCB0s/헤이독연어.jpg'
    },
    {
        id: 'atomy-dog-beef',
        brand: '애터미',
        name: '애터미 헤이 독 소고기',
        description: '뼈와 관절, 든든한 근육 건강 영양 만점 사료. 양질의 단백질로 기호성 최상, 200g 소포장.',
        kcalPerKg: 3500,
        keyIngredients: '호주산 청정 소고기',
        petType: 'dog',
        tags: ['관절', '근육건강', '기호성', '소고기'],
        imageUrl: 'https://i.postimg.cc/Kz0X9255/헤이독소고기.jpg'
    },
    {
        id: 'rc-mini-indoor-adult',
        brand: '로얄캐닌',
        name: '로얄캐닌 미니 인도어 어덜트',
        description: '실내 생활로 활동량이 적은 반려견 맞춤 사료. 소화 흡수율 극대화로 지독한 변 냄새 감소.',
        kcalPerKg: 3770,
        keyIngredients: 'L.I.P 고도 정제 단백질',
        petType: 'dog',
        tags: ['인도어', '소화흡수', '변냄새감소', '실내견'],
        imageUrl: 'https://i.postimg.cc/x1m29B0n/로얄캐닌미니인도어어덜트.jpg'
    },
    {
        id: 'rc-mini-indoor-puppy',
        brand: '로얄캐닌',
        name: '로얄캐닌 미니 인도어 퍼피',
        description: '면역력이 약한 폭풍 성장기 자견의 뼈대 구축. 턱이 작은 어린 강아지도 씹기 편한 맞춤 알갱이.',
        kcalPerKg: 3950,
        keyIngredients: '정제 단백질, 항산화 복합물',
        petType: 'dog',
        tags: ['퍼피', '면역력', '성장기', '소형견'],
        imageUrl: 'https://i.postimg.cc/13FQyb9t/로얄캐닌미니인도어퍼피.jpg'
    },
    {
        id: 'rc-mini-indoor-senior',
        brand: '로얄캐닌',
        name: '로얄캐닌 미니 인도어 시니어',
        description: '8세 이상 노령견의 활력 유지 및 신장 기능 보조. 치아가 약해진 시니어견을 위해 물에 잘 불어남.',
        kcalPerKg: 3600,
        keyIngredients: 'EPA/DHA 오메가3 지방산',
        petType: 'dog',
        tags: ['시니어', '노령견', '활력', '신장건강'],
        imageUrl: 'https://i.postimg.cc/J46NRdTm/로얄캐닌미니인도어시니어.jpg'
    },
    {
        id: 'rc-starter-mother-baby',
        brand: '로얄캐닌',
        name: '로얄캐닌 스타터 마더&베이비',
        description: '영양 소모가 큰 어미견과 아기 강아지 면역 강화. 부드러운 죽 형태로 첫 사료 적응용으로 완벽.',
        kcalPerKg: 4200,
        keyIngredients: '스타터 콤플렉스 (초유 유사)',
        petType: 'dog',
        tags: ['퍼피', '어미견', '초유', '면역력'],
        imageUrl: 'https://i.postimg.cc/8zvSTx1c/로얄캐닌스타터마더앤베이비.jpg'
    },
    {
        id: 'rc-mini-puppy-pouch',
        brand: '로얄캐닌',
        name: '로얄캐닌 미니 퍼피 파우치 85g',
        description: '폭풍 성장기 어린 강아지의 면역력과 소화기 건강 증진. 촉촉한 육즙으로 수분 보충 및 건식 사료 적응에 완벽.',
        kcalPerKg: 950,
        keyIngredients: '고품질 육류 및 항산화 복합물',
        petType: 'dog',
        tags: ['습식', '파우치', '퍼피', '수분보충'],
        imageUrl: 'https://i.postimg.cc/bwnhq4zz/로얄캐닌미니퍼피파우치.jpg'
    },
    {
        id: 'rc-mini-adult-pouch',
        brand: '로얄캐닌',
        name: '로얄캐닌 미니 어덜트 파우치 85g',
        description: '생후 10개월 이상 소형견의 식욕 증진과 건강한 소화 유지. 건식 사료와 섞어주면 입 짧은 아이도 밥그릇 순삭.',
        kcalPerKg: 900,
        keyIngredients: '소화 흡수율 높은 단백질',
        petType: 'dog',
        tags: ['습식', '파우치', '기호성', '소화도움'],
        imageUrl: 'https://i.postimg.cc/wjNp9n6B/로얄캐닌미니어덜트파우치.jpg'
    },
    {
        id: 'harim-dog-joint',
        brand: '밥이보약',
        name: '밥이보약 DOG 튼튼한 관절',
        description: '슬개골 탈구 예방 및 연골 건강 맞춤 식단. BHA/BHT 무첨가, 안심 휴먼그레이드.',
        kcalPerKg: 3400,
        keyIngredients: '100% 생닭고기, 글루코사민',
        petType: 'dog',
        tags: ['관절', '슬개골', '휴먼그레이드', '글루코사민'],
        imageUrl: 'https://i.postimg.cc/sXTFnrJW/하림밥이보약DOG튼튼한관절.jpg'
    },
    {
        id: 'harim-dog-immune',
        brand: '밥이보약',
        name: '밥이보약 DOG 든든한 면역',
        description: '환절기 기력 회복 및 면역력 강화 보양식. 까다로운 입맛도 잡는 극강의 기호성.',
        kcalPerKg: 3500,
        keyIngredients: '100% 생닭고기, 홍삼/영지버섯',
        petType: 'dog',
        tags: ['면역력', '기력회복', '홍삼', '보양식'],
        imageUrl: 'https://i.postimg.cc/zBzZSBTw/하림밥이보약DOG든든한면역.jpg'
    },
    {
        id: 'harim-dog-gut',
        brand: '밥이보약',
        name: '밥이보약 DOG 건강한 장',
        description: '유익균 증식 및 원활한 배변 활동 촉진. 묽은 변 개선 및 지독한 변 냄새 감소.',
        kcalPerKg: 3450,
        keyIngredients: '100% 생닭고기, 프락토올리고당',
        petType: 'dog',
        tags: ['장건강', '유산균', '변냄새감소', '배변활동'],
        imageUrl: 'https://i.postimg.cc/qRJVXR2s/하림밥이보약DOG건강한장.jpg'
    },
    {
        id: 'thereal-oven-beef-adult',
        brand: '더리얼',
        name: '더리얼 그레인프리 오븐베이크드 소고기 어덜트',
        description: '오븐에 구워 부드러운 식감으로 이가 약한 반려견에게도 초극세사. 곡물 무첨가(그레인프리)로 식이 알러지 최소화.',
        kcalPerKg: 3500,
        keyIngredients: '100% 휴먼그레이드 소고기',
        petType: 'dog',
        tags: ['오븐베이크드', '그레인프리', '알러지', '부드러운식감'],
        imageUrl: 'https://i.postimg.cc/PxXszx1N/하림더리얼그레인프리소고기어덜트.jpg'
    },
    {
        id: 'thereal-oven-lamb-adult',
        brand: '더리얼',
        name: '더리얼 그레인프리 오븐베이크드 양고기 어덜트',
        description: '오븐에 구워 부드러운 식감, 소화 흡수율이 뛰어나고 기호성 극강. 저알러지 단백질 사용으로 눈물 자국 및 피부 발진 개선.',
        kcalPerKg: 3450,
        keyIngredients: '100% 휴먼그레이드 양고기',
        petType: 'dog',
        tags: ['오븐베이크드', '그레인프리', '알러지', '눈물자국개선'],
        imageUrl: 'https://i.postimg.cc/nzFbYzqj/하림더리얼그레인프리양고기어덜트.png'
    },
    {
        id: 'petoria-pollack-lamb',
        brand: '펫토리아',
        name: '펫토리아 한끼뚝딱 황태/양고기',
        description: '기력 회복(황태)과 알러지 케어(양고기) 동시 충족. 말랑말랑한 소프트 식감으로 노령견도 OK.',
        kcalPerKg: 3400,
        keyIngredients: '황태, 저알러지 양고기',
        petType: 'dog',
        tags: ['기력회복', '알러지', '소프트사료', '황태'],
        imageUrl: 'https://i.postimg.cc/qMztxBGw/펫토리아한끼뚝딱황태와양고기.jpg'
    },
    {
        id: 'petoria-pollack-beef',
        brand: '펫토리아',
        name: '펫토리아 한끼뚝딱 황태/소고기',
        description: '에너지 보충과 근육 발달을 위한 영양 특식. 입 짧은 강아지도 밥그릇 비우는 마성의 맛.',
        kcalPerKg: 3450,
        keyIngredients: '황태, 고단백 소고기',
        petType: 'dog',
        tags: ['기력회복', '근육발달', '기호성', '황태'],
        imageUrl: 'https://i.postimg.cc/ZKC9xYLP/펫토리아한끼뚝딱황태와소고기.jpg'
    },
    {
        id: 'deten-senior',
        brand: '데텐',
        name: '데텐 오븐베이크드 알러지케어&시니어',
        description: '치아가 약하고 소화력이 떨어진 노령견을 위한 부드러운 소프트 사료. 활동량이 적은 시니어견의 체중 조절과 활력 유지에 탁월.',
        kcalPerKg: 3300,
        keyIngredients: '가수분해 단백질 및 저알러지 원료',
        petType: 'dog',
        tags: ['시니어', '알러지', '소프트사료', '체중조절', '가수분해'],
        imageUrl: 'https://i.postimg.cc/jSfbRBsT/더텐오븐베이크드알러지케어시니어.jpg'
    },
    {
        id: 'deten-joint',
        brand: '데텐',
        name: '데텐 오븐베이크드 알러지케어&관절',
        description: '슬개골 및 관절 연골 보호를 위한 영양소가 듬뿍 담긴 맞춤 예방식. 알러지 반응은 억제하고 관절 건강은 끌어올리는 일석이조.',
        kcalPerKg: 3400,
        keyIngredients: '가수분해 단백질 및 관절 영양 성분',
        petType: 'dog',
        tags: ['관절', '슬개골', '알러지', '가수분해'],
        imageUrl: 'https://i.postimg.cc/kgSm7Lnm/더텐오븐베이크드알러지케어관절.jpg'
    },
    {
        id: 'deten-immune',
        brand: '데텐',
        name: '데텐 오븐베이크드 알러지케어&면역',
        description: '기름기 없이 담백하게 구워낸 오븐베이크드 공법으로 면역력 집중 강화. 사료 특유의 역한 냄새 대신 고소한 쿠키 향이 나는 뽀송한 사료.',
        kcalPerKg: 3500,
        keyIngredients: '가수분해 단백질 및 저알러지 원료',
        petType: 'dog',
        tags: ['면역력', '알러지', '오븐베이크드', '가수분해'],
        imageUrl: 'https://i.postimg.cc/fRdNM1wQ/더텐오븐베이크드알러지케어면역.jpg'
    },
    {
        id: 'finiki-turkey',
        brand: '피니키',
        name: '피니키 거위&칠면조',
        description: '흔치 않은 단백질원 배합으로 식이 알러지 억제. 활동량 많은 아이를 위한 고단백 그레인프리.',
        kcalPerKg: 3550,
        keyIngredients: '거위/칠면조/양고기',
        petType: 'dog',
        tags: ['알러지', '그레인프리', '고단백', '희귀단백질'],
        imageUrl: 'https://i.postimg.cc/7LMr27GM/피니키거위칠면조.jpg'
    },
    {
        id: 'naturalo-lamb',
        brand: '네츄럴오',
        name: '네츄럴오 양고기',
        description: '식이 알러지 최소화 및 소화 흡수율 극대화. 화학비료나 농약 없는 100% 유기농 인증 원료로 안심 급여.',
        kcalPerKg: 3400,
        keyIngredients: '유기농 양고기',
        petType: 'dog',
        tags: ['유기농', '알러지', '소화도움', '안심원료'],
        imageUrl: 'https://i.postimg.cc/02FvR9qx/네츄럴오양고기.jpg'
    },
    {
        id: 'naturalo-mussel',
        brand: '네츄럴오',
        name: '네츄럴오 초록입홍합',
        description: '슬개골 및 관절 연골 건강 집중 케어. 노령견이나 관절이 약한 소형견의 필수 영양식.',
        kcalPerKg: 3400,
        keyIngredients: '유기농 원료 및 초록입홍합 추출물',
        petType: 'dog',
        tags: ['유기농', '관절', '초록입홍합', '소형견전용'],
        imageUrl: 'https://i.postimg.cc/4xcgXjJT/네츄럴오초록입홍합.jpg'
    },

    // --- CAT FOOD (21 Items) ---
    {
        id: 'atomy-cat-tuna',
        brand: '애터미',
        name: '애터미 헤이 캣 참치',
        description: '고양이 필수 아미노산 타우린 듬뿍, 기호성 최강. 참치 생육으로 만든 그레인프리 헤어볼 케어.',
        kcalPerKg: 3600,
        keyIngredients: '신선한 참치, 타우린',
        petType: 'cat',
        tags: ['기호성', '타우린', '그레인프리', '헤어볼'],
        imageUrl: 'https://i.postimg.cc/vmddTXBW/애터미헤이캣참치.jpg'
    },
    {
        id: 'rc-cat-indoor',
        brand: '로얄캐닌',
        name: '로얄캐닌 인도어 캣',
        description: '실내에서만 생활하는 고양이의 뭉친 헤어볼 완화. 활동량이 적은 뚱냥이를 막아주는 최적 칼로리.',
        kcalPerKg: 3750,
        keyIngredients: '고도 정제 단백질',
        petType: 'cat',
        tags: ['인도어', '헤어볼', '체중조절', '뚱냥이'],
        imageUrl: 'https://i.postimg.cc/K8T2mCZg/로얄캐닌인도어캣.jpg'
    },
    {
        id: 'rc-cat-kitten',
        brand: '로얄캐닌',
        name: '로얄캐닌 캣 키튼',
        description: '생후 1년 미만, 폭풍 성장기 아기 고양이 소화기 집중 발달. 덜 발달한 소화계를 고려한 초소형 십자가 알갱이.',
        kcalPerKg: 4090,
        keyIngredients: '항산화 복합물, 단백질',
        petType: 'cat',
        tags: ['키튼', '성장기', '소화도움'],
        imageUrl: 'https://i.postimg.cc/LsMM5vXP/로얄캐닌캣키튼.jpg'
    },
    {
        id: 'rc-cat-hairball',
        brand: '로얄캐닌',
        name: '로얄캐닌 헤어볼 케어',
        description: '장 내에 뭉친 털이 변으로 자연스럽게 배출 유도. 털갈이 시즌, 헤어볼 토가 잦은 고양이 필수템.',
        kcalPerKg: 3760,
        keyIngredients: '차전자피 등 특수 식이섬유',
        petType: 'cat',
        tags: ['헤어볼', '식이섬유', '헤어볼토'],
        imageUrl: 'https://i.postimg.cc/YSww089W/로얄캐닌헤어볼케어.jpg'
    },
    {
        id: 'rc-cat-indoor-longhair',
        brand: '로얄캐닌',
        name: '로얄캐닌 인도어 롱헤어',
        description: '장모종 특화. 피모 건강(EPA/DHA) 및 헤어볼 배출 유도. 긴 털을 가진 실내묘의 잦은 털 토를 막아주는 장모종 필수품.',
        kcalPerKg: 3820,
        keyIngredients: '고품질 단백질 및 특수 식이섬유',
        petType: 'cat',
        tags: ['인도어', '장모종', '헤어볼', '피모건강'],
        imageUrl: 'https://i.postimg.cc/6pZXBF9T/로얄캐닌인도어롱헤어.jpg'
    },
    {
        id: 'rc-cat-kitten-pouch',
        brand: '로얄캐닌',
        name: '로얄캐닌 캣 키튼 파우치 85g',
        description: '1년 미만 아기 고양이의 골격 발달과 면역 체계 형성. 부드러운 덩어리로 이유기 아기 냥이의 첫 습식으로 최고.',
        kcalPerKg: 950,
        keyIngredients: '고단백 육류 및 면역 강화 성분',
        petType: 'cat',
        tags: ['키튼', '습식', '파우치', '이유기'],
        imageUrl: 'https://i.postimg.cc/wBddMFvy/로얄캐닌캣키튼파우치.jpg'
    },
    {
        id: 'rc-cat-indoor-pouch',
        brand: '로얄캐닌',
        name: '로얄캐닌 인도어 캣 파우치 85g',
        description: '활동량이 적은 실내묘의 체중 조절과 요로계 건강 유지. 변 냄새 감소에 탁월하며 수분 보충으로 신장 건강 케어.',
        kcalPerKg: 850,
        keyIngredients: '소화율 높은 단백질 및 수분',
        petType: 'cat',
        tags: ['인도어', '습식', '파우치', '요로계', '변냄새감소'],
        imageUrl: 'https://i.postimg.cc/vZnsGCQ9/로얄캐닌인도어캣파우치.jpg'
    },
    {
        id: 'rc-cat-hairball-pouch',
        brand: '로얄캐닌',
        name: '로얄캐닌 헤어볼 케어 파우치 85g',
        description: '장운동을 촉진하여 위장 내 뭉친 털의 배출을 유도. 잦은 그루밍으로 털 토하는 냥이에게 건식과 교차 급여 필수.',
        kcalPerKg: 850,
        keyIngredients: '최적화된 식이섬유 배합',
        petType: 'cat',
        tags: ['헤어볼', '습식', '파우치', '헤어볼토'],
        imageUrl: 'https://i.postimg.cc/nLttrTz7/로얄캐닌헤어볼케어파우치.jpg'
    },
    {
        id: 'harim-cat-growth',
        brand: '밥이보약',
        name: '밥이보약 CAT 탄탄한 성장(키튼)',
        description: '폭풍 성장기 아기 고양이의 뼈/면역력 집중 발달. 고양이 필수 아미노산 타우린 듬뿍, 첫 사료 추천.',
        kcalPerKg: 3800,
        keyIngredients: '100% 생닭고기, 초유, DHA',
        petType: 'cat',
        tags: ['키튼', '성장기', '면역력', '초유'],
        imageUrl: 'https://i.postimg.cc/DZvkdZ1q/하림밥이보약CAT탄탄한성장.jpg'
    },
    {
        id: 'harim-cat-hairball',
        brand: '밥이보약',
        name: '밥이보약 CAT 걱정없는 헤어볼',
        description: '장내 뭉친 털을 변으로 부드럽게 배출 유도. 잦은 그루밍으로 토하는 실내 냥이 안성맞춤.',
        kcalPerKg: 3600,
        keyIngredients: '100% 생닭고기, 귀리 식이섬유',
        petType: 'cat',
        tags: ['헤어볼', '귀리식이섬유', '헤어볼토'],
        imageUrl: 'https://i.postimg.cc/wvq8cvDJ/하림밥이보약CAT걱정없는헤어볼.jpg'
    },
    {
        id: 'thereal-cat-tuna-adult',
        brand: '더리얼',
        name: '더리얼 캣 그레인프리 크런치 참치 어덜트',
        description: '생고기가 듬뿍 들어간 바삭한 크런치 식감으로 까다로운 입맛 저격. 곡물 무첨가로 소화 불량 방지 및 요로계 건강 유지 도움.',
        kcalPerKg: 3600,
        keyIngredients: '100% 휴먼그레이드 생참치',
        petType: 'cat',
        tags: ['크런치', '그레인프리', '기호성', '요로계'],
        imageUrl: 'https://i.postimg.cc/W3NL630k/하림더리얼그레인프리크런치참치어덜트.jpg'
    },
    {
        id: 'thereal-cat-salmon-adult',
        brand: '더리얼',
        name: '더리얼 캣 그레인프리 크런치 연어 어덜트',
        description: '오메가3가 풍부한 연어 함유로 윤기 나는 피모 관리와 건강 유지. 고양이 필수 아미노산 타우린 함유, 알러지 최소화 그레인프리.',
        kcalPerKg: 3650,
        keyIngredients: '100% 휴먼그레이드 생연어',
        petType: 'cat',
        tags: ['크런치', '그레인프리', '피모관리', '알러지'],
        imageUrl: 'https://i.postimg.cc/mDLfND7F/하림더리얼그레인프리크런치연어어덜트.jpg'
    },
    {
        id: 'thereal-cat-chicken-adult',
        brand: '더리얼',
        name: '더리얼 캣 그레인프리 크런치 닭고기 어덜트',
        description: '고단백 생닭고기 베이스로 튼튼한 근육 유지와 활력 넘치는 생활 지원. 소화가 잘되는 그레인프리 설계로 헤어볼 배출 및 장 건강 도움.',
        kcalPerKg: 3600,
        keyIngredients: '100% 휴먼그레이드 생닭고기',
        petType: 'cat',
        tags: ['크런치', '고단백', '그레인프리', '헤어볼', '장건강'],
        imageUrl: 'https://i.postimg.cc/JnrVcnjH/하림더리얼그레인프리크런치닭고기어덜트.jpg'
    },
    {
        id: 'catsrang-weightcare',
        brand: '캐츠랑',
        name: '캐츠랑 어덜트 웨이트케어 1.5kg',
        description: '과체중 고양이 및 활동량 적은 실내묘를 위한 칼로리/체중 조절 로직. L-카르니틴 함유로 지방 연소에 도움 및 헤어볼 케어 동시 지원.',
        kcalPerKg: 3300,
        keyIngredients: '닭고기 및 식이섬유',
        petType: 'cat',
        tags: ['체중조절', '인도어', '헤어볼', 'L-카르니틴'],
        imageUrl: 'https://i.postimg.cc/rpLLsgm1/캐츠랑어덜트웨이트케어.jpg'
    },
    {
        id: 'catsrang-kitten-junior',
        brand: '캐츠랑',
        name: '캐츠랑 키튼&주니어 2kg',
        description: '1세 미만 성장기 자묘의 두뇌 발달과 면역력 강화를 위한 고단백 영양. 소화 흡수율이 높아 아기 냥이의 맛동산 변 생성에 탁월.',
        kcalPerKg: 3900,
        keyIngredients: '닭고기 및 타우린/DHA',
        petType: 'cat',
        tags: ['키튼', '고단백', '두뇌발달', '소화도움'],
        imageUrl: 'https://i.postimg.cc/nLttrTz1/캐츠랑키튼앤주니어.jpg'
    },
    {
        id: 'catsrang-all-stage',
        brand: '캐츠랑',
        name: '캐츠랑 전연령 2kg',
        description: '기호성 최강! 다묘 가정에서 연령 상관없이 안심하고 급여 가능. 요로계 건강(LUTD) 예방 및 헤어볼 배출을 돕는 기능성 밸런스.',
        kcalPerKg: 3500,
        keyIngredients: '닭고기 및 헤어볼 케어 성분',
        petType: 'cat',
        tags: ['전연령', '기호성', '다묘가정', '요로계', '헤어볼'],
        imageUrl: 'https://i.postimg.cc/ZqhhnjRx/캐츠랑전연령.jpg'
    },
    {
        id: 'purina-kitten',
        brand: '퓨리나 프로플랜',
        name: '퓨리나 프로플랜 캣 키튼 1.5kg',
        description: '초유 함유로 1세 미만 아기 고양이의 장내 유익균 증식 및 자연 방어력. 뇌와 시력 발달을 돕는 DHA 강화 (수의사들이 추천하는 첫 사료).',
        kcalPerKg: 4100,
        keyIngredients: '순살 닭고기 및 초유 성분',
        petType: 'cat',
        tags: ['키튼', '초유', '면역력', '뇌시력발달'],
        imageUrl: 'https://i.postimg.cc/9Mm5tMyM/퓨리나캣키튼.png'
    },
    {
        id: 'purina-indoor',
        brand: '퓨리나 프로플랜',
        name: '퓨리나 프로플랜 캣 실내묘용 1.5kg',
        description: '활동량이 적은 실내 고양이의 체중 유지 및 헤어볼 억제 맞춤 영양. 24% 변 냄새 감소 효과 입증 (화장실 냄새에 민감한 집사님 추천).',
        kcalPerKg: 3750,
        keyIngredients: '순살 닭고기 및 이눌린(프리바이오틱스)',
        petType: 'cat',
        tags: ['인도어', '체중유지', '헤어볼', '변냄새감소'],
        imageUrl: 'https://i.postimg.cc/bvHftbDT/퓨리나실내묘용.png'
    },
    {
        id: 'purina-urinary',
        brand: '퓨리나 프로플랜',
        name: '퓨리나 프로플랜 캣 비뇨기계 관리 1.5kg',
        description: '방광 및 요로계 염증 완화를 위한 특수 포뮬러로 소변 pH 밸런스 조절. 물을 잘 안 마시거나 방광염/결석 이력이 있는 냥이들의 신장 지킴이.',
        kcalPerKg: 3800,
        keyIngredients: '순살 닭고기 및 오메가3 지방산',
        petType: 'cat',
        tags: ['비뇨기계', '요로계', '결석예방', '신장건강'],
        imageUrl: 'https://i.postimg.cc/hjDWbjVv/퓨리나유리너리케어.png'
    },
    {
        id: 'whiskas-kitten',
        brand: '위스카스',
        name: '위스카스 키튼 오션피쉬와 우유 1.1kg',
        description: '겉은 바삭, 속은 촉촉한 크림 포켓으로 아기 고양이 기호성 폭발. 칼슘 듬뿍 영양 만점, 입맛 까다로운 아이들도 순삭하는 마성의 맛.',
        kcalPerKg: 3700,
        keyIngredients: '신선한 생선 및 초유 칼슘',
        petType: 'cat',
        tags: ['키튼', '기호성', '크림포켓', '칼슘'],
        imageUrl: 'https://i.postimg.cc/15fgrRKW/위스카스키튼.jpg'
    },
    {
        id: 'whiskas-hairball',
        brand: '위스카스',
        name: '위스카스 헤어볼 참치와 닭고기 1.1kg',
        description: '잦은 그루밍으로 위장에 뭉친 헤어볼을 부드럽게 배출 유도. 천연 식이섬유 함유, 맛과 헤어볼 케어를 동시에 잡은 완성형 사료.',
        kcalPerKg: 3600,
        keyIngredients: '신선한 참치/닭고기 및 식이섬유',
        petType: 'cat',
        tags: ['헤어볼', '식이섬유', '기호성'],
        imageUrl: 'https://i.postimg.cc/X7pZkNgs/위스카스헤어볼케어.jpg'
    }
];
