// Serviço de Notificações Web e Permissões Nativas de Dispositivo

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Este navegador não suporta notificações de desktop/celular.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function sendPushNotification(title: string, body: string, icon: string = '/logo_cabral_locacoes.png'): boolean {
  if (!('Notification' in window)) return false;

  if (Notification.permission === 'granted') {
    try {
      const notification = new Notification(title, {
        body,
        icon,
        badge: icon,
        vibrate: [200, 100, 200] as unknown as number[],
        tag: 'cabral-alert',
      } as NotificationOptions);

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return true;
    } catch {
      // Fallback para navegadores móveis restritos
      return false;
    }
  }

  return false;
}

export async function requestCameraPermission(): Promise<{ granted: boolean; stream?: MediaStream; error?: string }> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return { granted: false, error: 'Acesso à câmera não suportado neste navegador.' };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment', // Câmera traseira no celular para ler odômetro/vistoria
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });
    return { granted: true, stream };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Permissão de câmera negada pelo usuário.';
    return { granted: false, error: errorMsg };
  }
}

export function stopCameraStream(stream?: MediaStream) {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}
