import { Subject } from 'rxjs';

export type WebSocketStatus = 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING';

class WebSocketService {
  private ws: WebSocket | null = null;
  private heartbeatInterval: number | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly heartbeatTimeout = 30000; // 30 seconds
  private readonly reconnectBackoff = 1000; // Start with 1 second

  public status$ = new Subject<WebSocketStatus>();

  constructor(private readonly url: string = 'ws://localhost:8080') {}

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.status$.next('CONNECTING');
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.status$.next('CONNECTED');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
    };

    this.ws.onclose = () => {
      this.status$.next('DISCONNECTED');
      this.stopHeartbeat();
      this.attemptReconnect();
    };

    this.ws.onerror = () => {
      this.status$.next('DISCONNECTED');
    };

    this.ws.onmessage = (event) => {
      if (event.data === 'pong') {
        // Reset heartbeat timer on pong
        this.startHeartbeat();
      }
    };
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send('ping');
      }
    }, this.heartbeatTimeout);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;

    this.status$.next('RECONNECTING');
    const backoffTime = this.reconnectBackoff * Math.pow(2, this.reconnectAttempts);
    
    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, backoffTime);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.stopHeartbeat();
  }
}

export const wsService = new WebSocketService();