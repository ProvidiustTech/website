(function () {
  'use strict';

  const SESSION_KEY = 'providius_session_id';
  const API_BASE    = 'https://hunter-curdle-oxidizing.ngrok-free.dev';
  const SEND_API    = `${API_BASE}/api/v1/webchat/message`;
  const WS_URL      = API_BASE.replace(/^http/, 'ws') + '/api/v1/telegram/ws';

  // ── Session ───────────────────────────────────────────────────────────────
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'web-' + Math.random().toString(36).slice(2, 9) + '-' + Date.now();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  // ── CSS ───────────────────────────────────────────────────────────────────
  const css = `
    #pv-fab {
      position: fixed; bottom: 28px; right: 28px;
      width: 58px; height: 58px; border-radius: 50%; border: none;
      background: linear-gradient(145deg, #0d9488, #0f766e);
      box-shadow: 0 4px 24px rgba(13,148,136,0.5);
      cursor: pointer; z-index: 2147483646;
      display: flex; align-items: center; justify-content: center;
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease;
      outline: none;
    }
    #pv-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(13,148,136,0.6); }
    #pv-fab:active { transform: scale(0.96); }
    #pv-fab .pv-fi { position: absolute; transition: opacity .2s, transform .25s; }
    #pv-fab .pv-fi-close { opacity: 0; transform: rotate(-90deg) scale(0.7); }
    #pv-fab.pv-open .pv-fi-chat  { opacity: 0; transform: rotate(90deg) scale(0.7); }
    #pv-fab.pv-open .pv-fi-close { opacity: 1; transform: rotate(0deg) scale(1); }

    #pv-badge {
      position: absolute; top: -2px; right: -2px;
      width: 19px; height: 19px; border-radius: 50%;
      background: #ef4444; color: white; font-size: 10px; font-weight: 700;
      display: none; align-items: center; justify-content: center;
      border: 2px solid white; font-family: sans-serif;
    }

    #pv-shell {
      position: fixed; bottom: 100px; right: 28px;
      width: 370px; height: 570px; max-height: calc(100vh - 124px);
      background: #ffffff; border-radius: 20px;
      box-shadow: 0 24px 64px -8px rgba(0,0,0,0.22), 0 4px 20px -4px rgba(0,0,0,0.1);
      display: flex; flex-direction: column; overflow: hidden;
      z-index: 2147483645;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
      transform-origin: bottom right;
      transform: scale(0.88) translateY(16px);
      opacity: 0; pointer-events: none;
      transition: transform .28s cubic-bezier(.34,1.4,.64,1), opacity .2s ease;
    }
    #pv-shell.pv-open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

    /* Header */
    #pv-head {
      background: linear-gradient(140deg, #115e59 0%, #0d9488 55%, #14b8a6 100%);
      padding: 18px 18px 16px; flex-shrink: 0; position: relative; overflow: hidden;
    }
    #pv-head::after {
      content: ''; position: absolute; top: -30px; right: -30px;
      width: 130px; height: 130px; border-radius: 50%;
      background: rgba(255,255,255,0.06); pointer-events: none;
    }
    #pv-head-row { display: flex; align-items: center; justify-content: space-between; }
    #pv-head-left { display: flex; align-items: center; gap: 12px; }
    #pv-av {
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(255,255,255,0.16); border: 2px solid rgba(255,255,255,0.28);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; position: relative;
    }
    #pv-av::after {
      content: ''; position: absolute; bottom: 1px; right: 0px;
      width: 11px; height: 11px; border-radius: 50%;
      background: #4ade80; border: 2.5px solid #0d9488;
    }
    #pv-name { color: white; font-weight: 700; font-size: 15px; }
    #pv-sub { color: rgba(255,255,255,0.7); font-size: 11.5px; margin-top: 2px; }
    #pv-hclose {
      background: rgba(255,255,255,0.12); border: none; cursor: pointer;
      width: 30px; height: 30px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.85); transition: background .15s; flex-shrink: 0;
    }
    #pv-hclose:hover { background: rgba(255,255,255,0.22); color: white; }

    /* Messages */
    #pv-msgs {
      flex: 1; overflow-y: auto; padding: 14px 13px;
      background: #f8fafc; display: flex; flex-direction: column; gap: 4px;
      scroll-behavior: smooth;
    }
    #pv-msgs::-webkit-scrollbar { width: 3px; }
    #pv-msgs::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

    .pv-row { display: flex; align-items: flex-end; gap: 7px; margin-bottom: 2px; }
    .pv-row.out { flex-direction: row-reverse; }
    .pv-av-sm {
      width: 27px; height: 27px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #0d9488, #0f766e);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; color: white;
    }
    .pv-sp { width: 27px; flex-shrink: 0; }
    .pv-col { display: flex; flex-direction: column; max-width: 74%; gap: 2px; }
    .pv-row.out .pv-col { align-items: flex-end; }

    .pv-b {
      padding: 9px 13px; border-radius: 16px; font-size: 13.5px;
      line-height: 1.55; word-break: break-word;
      animation: pvIn .16s ease;
    }
    @keyframes pvIn {
      from { opacity:0; transform: translateY(4px); }
      to   { opacity:1; transform: translateY(0); }
    }
    .pv-b.in {
      background: white; color: #0f172a;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .pv-b.out {
      background: linear-gradient(135deg, #0d9488, #0f766e);
      color: white; border-bottom-right-radius: 4px;
    }
    .pv-ts { font-size: 10.5px; color: #94a3b8; padding: 0 3px; }

    /* Typing */
    .pv-typing-row { display: flex; align-items: flex-end; gap: 7px; margin-bottom: 2px; }
    .pv-typing-bubble {
      background: white; border-radius: 16px; border-bottom-left-radius: 4px;
      padding: 11px 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.08);
      display: flex; gap: 4px; align-items: center;
    }
    .pv-d {
      width: 7px; height: 7px; border-radius: 50%; background: #94a3b8;
      animation: pvBounce 1.1s infinite ease-in-out;
    }
    .pv-d:nth-child(2) { animation-delay: .14s; }
    .pv-d:nth-child(3) { animation-delay: .28s; }
    @keyframes pvBounce {
      0%,55%,100% { transform: translateY(0); }
      27%          { transform: translateY(-5px); }
    }

    /* Footer */
    #pv-foot { padding: 10px 12px 12px; background: white; border-top: 1px solid #e2e8f0; flex-shrink: 0; }
    #pv-bar {
      display: flex; align-items: center; gap: 7px;
      background: #f1f5f9; border-radius: 13px; padding: 7px 7px 7px 14px;
      border: 1.5px solid transparent; transition: border-color .2s, background .2s, box-shadow .2s;
    }
    #pv-bar:focus-within {
      border-color: #0d9488; background: white;
      box-shadow: 0 0 0 3px rgba(13,148,136,0.12);
    }
    #pv-in {
      flex: 1; border: none; background: transparent; outline: none;
      font-size: 13.5px; color: #0f172a; font-family: inherit;
      min-width: 0; line-height: 1.4;
    }
    #pv-in::placeholder { color: #94a3b8; }
    #pv-send-btn {
      width: 36px; height: 36px; border-radius: 10px; border: none;
      background: linear-gradient(135deg, #0d9488, #0f766e);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(13,148,136,0.4);
      transition: opacity .15s, transform .15s, box-shadow .15s;
    }
    #pv-send-btn:hover:not(:disabled) { opacity:.9; transform:scale(1.05); }
    #pv-send-btn:active:not(:disabled) { transform:scale(0.93); }
    #pv-send-btn:disabled { opacity:.3; cursor:not-allowed; box-shadow:none; }
    #pv-pw { text-align:center; font-size:10px; color:#b0bec5; margin-top:7px; letter-spacing:.03em; }

    @media (max-width: 460px) {
      #pv-shell { inset:0; width:100%; height:100%; max-height:100%; border-radius:0; transform-origin: bottom center; }
      #pv-fab { bottom:18px; right:18px; }
    }
  `;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ── HTML ──────────────────────────────────────────────────────────────────
  const w = document.createElement('div');
  w.innerHTML = `
    <button id="pv-fab" aria-label="Open support chat">
      <span class="pv-fi pv-fi-chat">
        <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </span>
      <span class="pv-fi pv-fi-close">
        <svg width="19" height="19" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </span>
      <span id="pv-badge"></span>
    </button>

    <div id="pv-shell" role="dialog" aria-label="Support chat">
      <div id="pv-head">
        <div id="pv-head-row">
          <div id="pv-head-left">
            <div id="pv-av">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
            <div>
              <div id="pv-name">Support Team</div>
              <div id="pv-sub">● Online · typically instant</div>
            </div>
          </div>
          <button id="pv-hclose" aria-label="Close chat">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="pv-msgs"></div>

      <div id="pv-foot">
        <div id="pv-bar">
          <input id="pv-in" type="text" placeholder="Message us…" autocomplete="off" maxlength="1000"/>
          <button id="pv-send-btn" disabled aria-label="Send">
            <svg width="15" height="15" fill="white" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" stroke="white" stroke-width="2.5" fill="none"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div id="pv-pw">Secured by Providius</div>
      </div>
    </div>
  `;
  document.body.appendChild(w);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const fab    = document.getElementById('pv-fab');
  const shell  = document.getElementById('pv-shell');
  const msgs   = document.getElementById('pv-msgs');
  const input  = document.getElementById('pv-in');
  const sendB  = document.getElementById('pv-send-btn');
  const badge  = document.getElementById('pv-badge');
  const hclose = document.getElementById('pv-hclose');

  let isOpen = false, unread = 0, typingEl = null, wsTimer = null, ws = null;

  // ── Toggle ────────────────────────────────────────────────────────────────
  function openChat()  { isOpen=true;  shell.classList.add('pv-open'); fab.classList.add('pv-open'); clearUnread(); setTimeout(()=>input.focus(),240); }
  function closeChat() { isOpen=false; shell.classList.remove('pv-open'); fab.classList.remove('pv-open'); }
  function toggle()    { isOpen ? closeChat() : openChat(); }

  fab.addEventListener('click', toggle);
  hclose.addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key==='Escape' && isOpen) closeChat(); });

  // ── Badge ─────────────────────────────────────────────────────────────────
  function addUnread()  { if(isOpen) return; unread++; badge.textContent=unread>9?'9+':unread; badge.style.display='flex'; }
  function clearUnread(){ unread=0; badge.style.display='none'; }

  // ── Utils ─────────────────────────────────────────────────────────────────
  function ts() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }
  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function scrollBottom() { msgs.scrollTop = msgs.scrollHeight; }

  // ── Render ────────────────────────────────────────────────────────────────
  function addMsg(text, dir /* 'in'|'out' */, time) {
    const row = document.createElement('div');
    row.className = `pv-row ${dir==='out'?'out':''}`;
    row.innerHTML = `
      ${dir==='in' ? '<div class="pv-av-sm">S</div>' : '<div class="pv-sp"></div>'}
      <div class="pv-col">
        <div class="pv-b ${dir}">${esc(text)}</div>
        <span class="pv-ts">${time||ts()}</span>
      </div>
      ${dir==='out' ? '<div class="pv-sp"></div>' : ''}
    `;
    msgs.appendChild(row);
    scrollBottom();
  }

  // ── Typing indicator ──────────────────────────────────────────────────────
  function showTyping() {
    if (typingEl) return;
    const row = document.createElement('div');
    row.className = 'pv-typing-row';
    row.innerHTML = `
      <div class="pv-av-sm">S</div>
      <div class="pv-typing-bubble">
        <div class="pv-d"></div><div class="pv-d"></div><div class="pv-d"></div>
      </div>`;
    msgs.appendChild(row);
    typingEl = row;
    scrollBottom();
  }
  function hideTyping() { if(typingEl){typingEl.remove();typingEl=null;} }

  // ── Welcome ───────────────────────────────────────────────────────────────
  addMsg("👋 Hi! How can we help you today?", 'in');

  // ── WebSocket ─────────────────────────────────────────────────────────────
  function connectWS() {
    try {
      ws = new WebSocket(WS_URL);
      ws.onopen = () => console.log('[Providius] WS ready');
      ws.onmessage = (e) => {
        try {
          const d = JSON.parse(e.data);
          if (d.event === 'message_sent' && d.message) {
            const m = d.message;
            if (m.platform === 'webchat' || m.chat_id === sessionId) {
              hideTyping();
              addMsg(m.text, 'in', m.time);
              addUnread();
            }
          }
          if (d.event === 'typing' && d.chat_id === sessionId) {
            showTyping();
            clearTimeout(wsTimer);
            wsTimer = setTimeout(hideTyping, 3000);
          }
        } catch(_) {}
      };
      ws.onclose = () => { ws=null; setTimeout(connectWS, 3000); };
      ws.onerror = () => ws && ws.close();
    } catch(_) {}
  }
  connectWS();

  // ── Send ──────────────────────────────────────────────────────────────────
  async function send() {
    const text = input.value.trim();
    if (!text || sendB.disabled) return;
    input.value = '';
    sendB.disabled = true;
    addMsg(text, 'out');

    try {
      const r = await fetch(SEND_API, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'ngrok-skip-browser-warning':'true' },
        body: JSON.stringify({ session_id:sessionId, sender_name:'Website Visitor', text }),
      });
      if (!r.ok) addMsg("Couldn't send. Please try again.", 'in');
    } catch(_) {
      addMsg("No connection. Please check your network.", 'in');
    } finally {
      sendB.disabled = input.value.trim().length === 0;
      input.focus();
    }
  }

  sendB.addEventListener('click', send);
  input.addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} });
  input.addEventListener('input', () => { sendB.disabled = input.value.trim().length===0; });

})();