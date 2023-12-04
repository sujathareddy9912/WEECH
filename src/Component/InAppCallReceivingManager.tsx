import RtmEngine from 'agora-react-native-rtm';
import {EventEmitter} from 'events';

const config = {
  appId: 'bb1ce266dfa14e02ba25ab30a524de9c',
};

export default class RtmAdapter extends EventEmitter {
  private readonly client: RtmEngine;
  public uid: string | any;

  constructor() {
    super();
    this.uid = null;
    this.client = new RtmEngine();
    const events = [
      'tokenExpired',
      'remoteInvitationRefused',
      'remoteInvitationFailure',
      'remoteInvitationCanceled',
      'remoteInvitationAccepted',
      'messageReceived',
      'localInvitationRefused',
      'localInvitationReceivedByPeer',
      'localInvitationFailure',
      'localInvitationCanceled',
      'localInvitationAccepted',
      'error',
      'connectionStateChanged',
      'channelMessageReceived',
      'channelMemberLeft',
      'channelMemberJoined',
      'remoteInvitationReceived',
    ];
    events.forEach((event: string) => {
      // @ts-ignore
      this.client.on(event, (evt: any) => {
        console.warn(event, evt);
        // alert(evt)
        this.emit(event, evt);
      });
    });
  }

  async login(uid: string): Promise<any> {
    await this.client.createClient(config.appId);
    this.uid = uid;
    return this.client.login({
      uid: this.uid,
    });
  }

  async logout(): Promise<any> {
    await this.client.logout();
  }

  async join(cid: string): Promise<any> {
    return this.client.joinChannel(cid);
  }

  async leave(cid: string): Promise<any> {
    return this.client.leaveChannel(cid);
  }

  async sendChannelMessage(channel: string, message: string): Promise<any> {
    return this.client.sendMessageByChannelId(channel, message);
  }

  async destroy(): Promise<any> {
    await this.client.destroyClient();
  }
}
