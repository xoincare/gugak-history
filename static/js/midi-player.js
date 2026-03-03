/**
 * MIDI Player for Gugak History
 * Uses Tone.js + @tonejs/midi for web-based MIDI playback
 */

// MIDI file catalog organized by suite
const MIDI_CATALOG = {
  "영산회상": {
    label: "영산회상 (현악 9곡)",
    era: "조선 초기~후기",
    files: [
      { name: "상령산", file: "영산회상 상령산_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "중령산", file: "영산회상 중령산_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "세령산", file: "영산회상 세령산_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "가락덜이", file: "영산회상 가락덜이_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "상현도드리", file: "영산회상 상현도드리_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "하현도드리", file: "영산회상 하현도드리_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "염불도드리", file: "영산회상 염불도드리_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "타령", file: "영산회상 타령_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "군악", file: "영산회상 군악_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
    ]
  },
  "관악영산회상": {
    label: "관악영산회상 (8곡)",
    era: "조선 후기",
    files: [
      { name: "상령산", file: "관악영산회상 상령산_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "중령산", file: "관악영산회상 중령산_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "세령산", file: "관악영산회상 세령산_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "가락덜이", file: "관악영산회상 가락덜이_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "상현도드리", file: "관악영산회상 상현도드리_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "염불도드리", file: "관악영산회상 염불도드리_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "타령", file: "관악영산회상 타령_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "군악", file: "관악영산회상 군악_daegeum_piri_haegeum_ajaeng_v2.mid" },
    ]
  },
  "평조회상": {
    label: "평조회상 (8곡)",
    era: "조선 후기",
    files: [
      { name: "상령산", file: "평조회상 상령산_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "중령산", file: "평조회상 중령산_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "세령산", file: "평조회상 세령산_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "가락덜이", file: "평조회상 가락덜이_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "상현도드리", file: "평조회상 상현도드리_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "염불도드리", file: "평조회상 염불도드리_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "타령", file: "평조회상 타령_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "군악", file: "평조회상 군악_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
    ]
  },
  "독립곡": {
    label: "독립곡 (4곡)",
    era: "백제~조선 세종",
    files: [
      { name: "수제천 壽齊天", file: "수제천_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "여민락 與民樂", file: "여민락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "동동 動動", file: "동동_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "보허자 步虛子", file: "보허자_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "도드리": {
    label: "도드리·천년만세 (5곡)",
    era: "조선 후기",
    files: [
      { name: "밑도드리", file: "밑도드리_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "웃도드리", file: "웃도드리_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "우조가락도드리", file: "천년만세 우조가락도드리_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "양청도드리", file: "천년만세 양청도드리_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "계면가락도드리", file: "천년만세 계면가락도드리_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "취타": {
    label: "취타·현악취타 (10곡)",
    era: "조선 초기~후기",
    files: [
      { name: "취타 취타", file: "취타 취타_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "취타 길군악", file: "취타 길군악_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "취타 길타령", file: "취타 길타령_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "취타 별우조타령", file: "취타 별우조타령_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "취타 군악", file: "취타 군악_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "현악 취타", file: "현악취타 취타_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "현악 길군악", file: "현악취타 길군악_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "현악 길타령", file: "현악취타 길타령_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "현악 별우조타령", file: "현악취타 별우조타령_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
      { name: "현악 군악", file: "현악취타 군악_gayageum_geomungo_daegeum_piri_haegeum_ajaeng_v2.mid" },
    ]
  },
  "남창우조": {
    label: "남창 우조 가곡 (11곡)",
    era: "조선 중기~후기",
    files: [
      { name: "초수대엽", file: "남창우조 초수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "이수대엽", file: "남창우조 이수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "삼수대엽", file: "남창우조 삼수대엽_daegeum_piri_haegeum_gayageum_v2.mid" },
      { name: "평거", file: "남창우조 평거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "두거", file: "남창우조 두거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "중거", file: "남창우조 중거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "우락", file: "남창우조 우락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "우롱", file: "남창우조 우롱_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "우편", file: "남창우조 우편_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "언락", file: "남창우조 언락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "소용이", file: "남창우조 소용이_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "남창계면": {
    label: "남창 계면 가곡 (13곡)",
    era: "조선 중기~후기",
    files: [
      { name: "초수대엽", file: "남창계면 초수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "이수대엽", file: "남창계면 이수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "삼수대엽", file: "남창계면 삼수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "평거", file: "남창계면 평거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "두거", file: "남창계면 두거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "중거", file: "남창계면 중거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "계락", file: "남창계면 계락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "언롱", file: "남창계면 언롱_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "언편", file: "남창계면 언편_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "편수대엽", file: "남창계면 편수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "태평가", file: "남창계면 태평가_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "소용이", file: "남창계면 소용이_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "평롱", file: "남창계면 평롱_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "남창반우반계": {
    label: "남창 반우반계 (2곡)",
    era: "조선 후기",
    files: [
      { name: "반엽", file: "남창반우반계 반엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "편락", file: "남창반우반계 편락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "여창우조": {
    label: "여창 우조 가곡 (5곡)",
    era: "조선 후기",
    files: [
      { name: "이수대엽", file: "여창우조 이수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "중거", file: "여창우조 중거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "평거", file: "여창우조 평거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "두거", file: "여창우조 두거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "우락", file: "여창우조 우락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "여창계면": {
    label: "여창 계면 가곡 (7곡)",
    era: "조선 후기",
    files: [
      { name: "이수대엽", file: "여창계면 이수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "중거", file: "여창계면 중거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "평거", file: "여창계면 평거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "두거", file: "여창계면 두거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "계락", file: "여창계면 계락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "편수대엽", file: "여창계면 편수대엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "태평가", file: "여창계면 태평가_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "여창반우반계": {
    label: "여창 반우반계 (2곡)",
    era: "조선 후기",
    files: [
      { name: "반엽", file: "여창반우반계 반엽_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "환계락", file: "여창반우반계 환계락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
  "자진한잎": {
    label: "자진한잎 (7곡)",
    era: "조선 중기~후기",
    files: [
      { name: "염양춘", file: "자진한잎 염양춘_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "수룡음 농", file: "자진한잎 수룡음 농_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "수룡음 편1", file: "자진한잎 수룡음 편1_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "수룡음 편2", file: "자진한잎 수룡음 편2_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "수룡음 계락", file: "자진한잎 수룡음 계락_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "경풍년 우조두거", file: "자진한잎 경풍년 우조두거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
      { name: "경풍년 변조두거", file: "자진한잎 경풍년 변조두거_daegeum_piri_haegeum_gayageum_geomungo_v2.mid" },
    ]
  },
};

let synths = [];
let currentMidi = null;
let isPlaying = false;
let startTime = 0;
let progressInterval = null;

function buildPlayerUI() {
  const container = document.getElementById('midi-player-app');
  if (!container) return;

  // Build suite selector
  let html = `
    <div class="mp-controls">
      <div class="mp-now-playing">
        <div class="mp-title" id="mp-title">곡을 선택하세요</div>
        <div class="mp-sub" id="mp-sub"></div>
      </div>
      <div class="mp-buttons">
        <button id="mp-play" class="mp-btn" disabled>▶ 재생</button>
        <button id="mp-stop" class="mp-btn" disabled>⏹ 정지</button>
        <div class="mp-progress-wrap">
          <div class="mp-progress" id="mp-progress"></div>
        </div>
        <span class="mp-time" id="mp-time">0:00</span>
      </div>
    </div>
    <div class="mp-catalog">
  `;

  for (const [key, suite] of Object.entries(MIDI_CATALOG)) {
    html += `<div class="mp-suite">
      <div class="mp-suite-header" onclick="toggleSuite(this)">
        <span class="mp-arrow">▶</span> ${suite.label} <span class="mp-era">${suite.era}</span>
      </div>
      <div class="mp-suite-list" style="display:none">`;
    for (const track of suite.files) {
      const encoded = encodeURIComponent(track.file);
      html += `<div class="mp-track" data-file="${encoded}" onclick="loadTrack(this, '${encoded}', '${track.name}', '${suite.label}')">
        <span class="mp-track-icon">♪</span> ${track.name}
        <a href="/static/midi/${encoded}" download class="mp-dl" title="다운로드" onclick="event.stopPropagation()">⬇</a>
      </div>`;
    }
    html += `</div></div>`;
  }

  html += `</div>`;
  container.innerHTML = html;

  document.getElementById('mp-play').addEventListener('click', togglePlay);
  document.getElementById('mp-stop').addEventListener('click', stopMidi);
}

function toggleSuite(el) {
  const list = el.nextElementSibling;
  const arrow = el.querySelector('.mp-arrow');
  if (list.style.display === 'none') {
    list.style.display = 'block';
    arrow.textContent = '▼';
  } else {
    list.style.display = 'none';
    arrow.textContent = '▶';
  }
}

async function loadTrack(el, encodedFile, name, suiteName) {
  // Highlight
  document.querySelectorAll('.mp-track.active').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  stopMidi();
  document.getElementById('mp-title').textContent = name;
  document.getElementById('mp-sub').textContent = suiteName;
  document.getElementById('mp-play').disabled = true;
  document.getElementById('mp-time').textContent = '로딩...';

  try {
    const url = `/static/midi/${encodedFile}`;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    currentMidi = new Midi(arrayBuffer);
    document.getElementById('mp-play').disabled = false;
    const dur = currentMidi.duration;
    document.getElementById('mp-time').textContent = formatTime(0) + ' / ' + formatTime(dur);
    // Auto-play
    togglePlay();
  } catch (e) {
    document.getElementById('mp-time').textContent = '로딩 실패';
    console.error(e);
  }
}

function togglePlay() {
  if (!currentMidi) return;
  if (isPlaying) {
    pauseMidi();
  } else {
    playMidi();
  }
}

function playMidi() {
  if (!currentMidi) return;
  
  // Stop previous
  synths.forEach(s => s.dispose());
  synths = [];

  const now = Tone.now() + 0.1;
  startTime = now;

  currentMidi.tracks.forEach(track => {
    const synth = new Tone.PolySynth(Tone.Synth, {
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.8 },
      oscillator: { type: 'triangle8' }
    }).toDestination();
    synth.volume.value = -8;
    synths.push(synth);

    track.notes.forEach(note => {
      synth.triggerAttackRelease(
        note.name,
        note.duration,
        note.time + now,
        note.velocity
      );
    });
  });

  isPlaying = true;
  document.getElementById('mp-play').textContent = '⏸ 일시정지';
  
  const totalDur = currentMidi.duration;
  progressInterval = setInterval(() => {
    const elapsed = Tone.now() - startTime;
    const pct = Math.min(elapsed / totalDur * 100, 100);
    document.getElementById('mp-progress').style.width = pct + '%';
    document.getElementById('mp-time').textContent = formatTime(elapsed) + ' / ' + formatTime(totalDur);
    if (elapsed >= totalDur) {
      stopMidi();
    }
  }, 200);

  Tone.Transport.start();
}

function pauseMidi() {
  synths.forEach(s => s.dispose());
  synths = [];
  isPlaying = false;
  clearInterval(progressInterval);
  document.getElementById('mp-play').textContent = '▶ 재생';
}

function stopMidi() {
  synths.forEach(s => s.dispose());
  synths = [];
  isPlaying = false;
  clearInterval(progressInterval);
  document.getElementById('mp-play').textContent = '▶ 재생';
  document.getElementById('mp-progress').style.width = '0%';
  if (currentMidi) {
    document.getElementById('mp-time').textContent = '0:00 / ' + formatTime(currentMidi.duration);
  }
  document.getElementById('mp-stop').disabled = false;
  document.getElementById('mp-play').disabled = !currentMidi;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// Init when DOM ready
document.addEventListener('DOMContentLoaded', buildPlayerUI);
