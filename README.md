# 🎵 Harmonia (하모니아) — 세계 음악 역사 플랫폼

> *세종대왕의 정간보(1447) 정신을 21세기 디지털 기술로 계승합니다.*

[![Deploy](https://img.shields.io/badge/Cloud%20Run-Live-blue?logo=google-cloud)](https://gugak-history-442561452636.asia-northeast3.run.app)
[![Songs](https://img.shields.io/badge/Songs-217%2C882-gold)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

하모니아는 **21만 곡의 MIDI 아카이브**를 기반으로 인류의 음악 역사를 탐험하고 감상할 수 있는 웹 플랫폼입니다.

🔗 **Live**: https://gugak-history-442561452636.asia-northeast3.run.app

## ✨ 핵심 기능

| 기능 | 설명 |
|------|------|
| 🌍 **세계 음악 아카이브** | 217,882곡 — 한국 궁중정악부터 클래식, 팝, 재즈, 세계 민요까지 |
| 📜 **한국 vs 세계 연표** | BC 1400~현대, 한국(좌)과 세계(우) 음악사를 비교하며 감상 |
| 🔍 **다국어 검색** | 곡명 + 나라명(한글/영문) 검색 — "프랑스" → 라 마르세예즈 |
| 📺 **테마 채널** | 클래식 거장, 한국의 소리, 힐링 피아노 등 큐레이션 플레이리스트 |
| ⚡ **브라우저 재생** | Tone.js 기반 — 설치 없이 바로 듣기 |

## 📦 데이터셋

| 데이터셋 | 곡 수 | 설명 |
|----------|-------|------|
| Lakh MIDI | 195,817 | 팝/록/재즈 전 장르 |
| ADL Piano | 11,087 | 클래식/뉴에이지 피아노 |
| Historical World | 2,754 | 세계 각국 전통 음악 (10개 지역) |
| Mutopia Project | 1,529 | 상업 활용 가능 클래식 거장곡 |
| Korean Jeongganbo | 170 | 시김새 v2 반영 궁중정악 및 민속악 |

### 세계 전통음악 지역 (Historical World)

🇰🇷 한국 전통음악 (94곡) · 🏛️ 고대 그리스·로마 · 🏰 유럽 중세·르네상스 · 🎻 유럽 민속음악 · 🍀 켈틱 · 🕌 중동·터키 마캄 · 🇮🇳 인도 라가 · 🇨🇳 중국 전통 · 💃 라틴 아메리카 · 🏳️ 세계 국가(國歌)·민요

## 🏗️ 아키텍처

```
┌─────────────┐    ┌──────────────┐    ┌──────────────────┐
│  Frontend   │───▶│   Backend    │───▶│  Google Cloud    │
│ Vanilla JS  │    │ Python HTTP  │    │  Storage (GCS)   │
│ Tone.js     │    │ SQLite index │    │  gs://harmonia-   │
│ Dark Mode   │    │              │    │  midi             │
└─────────────┘    └──────────────┘    └──────────────────┘
```

- **Frontend**: Vanilla JS + Tone.js + @tonejs/midi, Responsive Dark Theme
- **Backend**: Python HTTP Server + GCS Cloud-Native Streaming
- **Storage**: Google Cloud Storage (`gs://harmonia-midi`)
- **Database**: SQLite (`harmonia.db`) 메타데이터 인덱싱
- **Deploy**: Google Cloud Run (`asia-northeast3`)

## 🚀 배포

```bash
# Cloud Run 배포
gcloud run deploy harmonia \
  --source . \
  --region asia-northeast3 \
  --project homeregister1 \
  --port 8080 \
  --memory 256Mi \
  --allow-unauthenticated
```

## 🛠️ 관리 도구

| 스크립트 | 용도 |
|----------|------|
| `generate_catalog.py` | 로컬 MIDI → catalog.json 생성 |
| `scripts/add_song.py` | 새 곡 + 메타데이터 추가 CLI |
| `scripts/enrich_catalog.py` | 대규모 메타데이터(작곡가, 시대, 태그) 부착 |
| `scripts/upload_to_gcs.py` | MIDI 파일 및 DB를 GCS 업로드 |

## 📜 한국 궁중정악 특별 섹션

- **정간보(井間譜)**: 세종대왕 1447년 창제 — 동양 최초 정량기보법
- **91곡 궁중정악 MIDI**: 영산회상, 여민락, 수제천, 보태평·정대업 등
- **종묘제례악**: 유네스코 인류무형문화유산 (2001)
- **시김새(장식음)** Pitch Bend 반영 v2 버전

## 📚 관련 프로젝트

- [xoincare/jeongganbo-midi](https://github.com/xoincare/jeongganbo-midi) — 정간보 → MIDI 변환기 + 91곡 아카이브
- [xoincare/SpineCobb](https://github.com/xoincare/SpineCobb) — 척추 Cobb angle AI 측정

---

*"국악의 역사" 프로젝트에서 "하모니아(Harmonia)" 세계 음악 플랫폼으로 확장되었습니다.*
