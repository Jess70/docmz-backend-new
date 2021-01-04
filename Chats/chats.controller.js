const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey-fc767db20c.json');
const { Conversation, Chat } = require('./conversation.model');
const Patient = require('../users/user.model');
const Doctor = require('../doctor/practice.model');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

async function setChatSocket(id, type, socketID) {
	/**
	 *  id: id of doctor/patient
	 *  type: doctor/patient
	 *  data: current socket data
	 */
	if (type.toLowerCase() === 'doctor') {
		// Doctors[id].socket = data;
		// Doctors[id].online = true;
		// await Doctor.updateOne({ _id: id }, { socket: data, online: true });
		const doctor = await Doctor.findById(id);
		doctor.socket = socketID;
		doctor.online = true;
		try {
			await doctor.save();
		} catch (e) {
			console.log('error ', e);
		}
	} else {
		// await Patient.updateOne({ _id: id }, { socket: data, online: true });
		const patient = await Patient.findById(id);
		patient.socket = socketID;
		patient.online = true;
		try {
			await patient.save();
		} catch (e) {
			console.log('error ', e);
		}
	}
}
async function getConversations(id, type) {
	if (type.toLowerCase() === 'doctor') {
		const conv = await Doctor.findById(id, 'conversations')
			.populate({
				path: 'conversations',
				populate: [
					'Chats',
					{
						path: 'Chats',
						options: {
							sort: {
								timestamp: 'desc',
							},
							limit: 50,
						},
					},
				],
			})
			.populate({
				path: 'conversations',
				populate: [
					'User',
					{
						path: 'User',
						select: 'firstName lastName picture',
					},
				],
			})
			.exec();

		return conv;
	} else {
		const conv = await Patient.findById(id, 'conversations')
			.populate({
				path: 'conversations',
				populate: [
					'Chats',
					{ path: 'User', select: 'firstName lastName picture' },
				],
			})
			.exec();
		return conv;
	}
}
async function deleteChatSocket(id, type) {
	if (id)
		if (type.toLowerCase() === 'doctor') {
			// Doctors[id].socket = data;
			// Doctors[id].online = true;
			// Doctor.findByIdAndUpdate()
			await Doctor.updateOne(
				{ _id: id },
				{ socket: false, online: false },
			);
		} else {
			await Patient.updateOne(
				{ _id: id },
				{ socket: false, online: false },
			);
		}
}
async function getChatSocket(id, type) {
	if (type.toLowerCase() === 'doctor') {
		const socketInfo = await Doctor.findById(
			id,
			'socket online deviceToken',
		);
		return socketInfo;
	} else {
		const socketInfo = await Patient.findById(
			id,
			'socket online deviceToken',
		);
		return socketInfo;
	}
}

async function sendMessage(to, message, from, toType, fromType, socket) {
	let socketID = false;
	let online = false;
	let deviceToken = [];
	getChatSocket(to, toType)
		.then((res) => {
			console.log('socket info ', res);
			socketID = res.socket;
			online = res.online;
			deviceToken = res.deviceToken;
			console.log(socketID, online, deviceToken);
		})
		.catch((e) => {
			console.log(e);
		});
	let toConversations = [];
	let fromConversations = [];

	const fetchConversations = async (type, id, conversationUser) => {
		if (type.toLowerCase() === 'doctor') {
			let conversation = await Doctor.findById(id, 'conversations')
				.populate('conversations', 'User Chats', {
					User: conversationUser,
				})
				.exec();
			// console.log(conversation);
			return conversation;
			// let conversation = await Doctor.findOne({
			// 	_id: id,
			// 	'conversations.fromWhom': conversationUser,
			// });
			// return conversation;
		} else {
			let conversation = await Patient.findById(id, 'conversations')
				.populate('conversations', 'User Chats', {
					User: conversationUser,
				})
				.exec();
			// console.log(conversation);
			return conversation;
		}
	};

	const storeMessage = async (
		conversation,
		user,
		fromWhom,
		message,
		to,
		messageObject,
	) => {
		const chat = new Chat({
			message,
			fromWhom: fromWhom,
			readReceipt: 1,
		});
		if (conversation.conversations.length) {
			// there is conversation available,push to the chat
			// and emit send_message event with "from" and "message" as user already exits
			conversation.conversations[0].Chats.unshift(chat);
			try {
				await chat.save();
				// console.log(conversation.conversations);
				await conversation.conversations[0].save();
				const {
					online,
					socketID,
					socket,
					message,
					from,
					deviceToken,
					receiver,
				} = messageObject;
				if (online) {
					//send instant message
					if (receiver) {
						console.log('sent message');

						socket
							.to(socketID)
							.emit('receive_message', { message, from });
					}
				} else {
					//send via FCM
					console.log('send via FCM with token ', deviceToken);
					if (deviceToken && deviceToken.length > 0)
						await admin.messaging().sendToDevice(
							deviceToken, // ['token_1', 'token_2', ...]
							{
								data: {
									message,
									froM: from,
								},
							},
							{
								// Required for background/quit data-only messages on iOS
								contentAvailable: true,
								// Required for background/quit data-only messages on Android
								priority: 'high',
							},
						);
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			//create conversation and push to the chat

			console.log('not present');
			let USER;
			if (user.type.toLowerCase() === 'doctor') {
				USER = await Doctor.findById(user.id);
			} else {
				USER = await Patient.findById(user.id);
			}
			// console.log(USER);
			const convo = new Conversation({
				fromWhom: 'Practise',
				User: to,
				Chats: [chat],
			});

			USER.conversations.push(convo);

			try {
				await chat.save();
				await convo.save();
				await USER.save();
				await convo
					.populate({
						path: 'User',
						select: 'firstName lastName picture',
					})
					.execPopulate();
				console.log('convo after ', convo);
				// emit an event to send whole conversation ... receive_conversation
				const { online, socketID, socket, deviceToken } = messageObject;
				if (online) {
					//send instant message
					console.log('sent conversation');
					socket
						.to(socketID)
						.emit('receive_conversation', { conversation: convo });
				} else {
					// send Via FCM
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	toConversations = fetchConversations(toType, to, from);
	fromConversations = fetchConversations(fromType, from, to);

	toConversations
		.then((conversation) => {
			storeMessage(
				conversation,
				{ type: toType, id: to },
				from,
				message,
				from,
				{
					online,
					socketID,
					socket,
					message,
					from,
					deviceToken,
				},
			);
		})
		.catch((e) => {
			console.log(e);
		});
	fromConversations
		.then((conversation) => {
			storeMessage(
				conversation,
				{ type: fromType, id: from },
				from,
				message,
				to,
				{
					online,
					socketID,
					socket,
					message,
					from,
					receiver: true,
				},
			);
		})
		.catch((e) => {
			console.log(e);
		});
}
async function clearConvo(id) {
	const doc = await Doctor.findById(id);
	doc.conversations = [];
	await doc.save();
}
async function handleCallUser(data, socket) {
	console.log('make-call recieved');
	const { offer, to, type, User, UserType } = data;
	try {
		const res = await getChatSocket(to, type);
		const online = res.online;
		const socketID = res.socket;
		const deviceToken = res.deviceToken;
		console.log('online ', online, socketID, deviceToken);
		// if (online) {
		console.log('emited call-made to ', socketID);
		socket.to(socketID).emit('call-made', {
			offer,
			fromSocket: socket.id,
			User,
			type: UserType,
		});
		// if (deviceToken && deviceToken.length > 0)
		// 	await admin.messaging().sendToDevice(
		// 		deviceToken, // ['token_1', 'token_2', ...]
		// 		{
		// 			data: {
		// 				offer: JSON.stringify(offer),
		// 				fromSocket: socket.id,
		// 				User: JSON.stringify(User),
		// 				type: UserType,
		// 			},
		// 		},
		// 		{
		// 			// Required for background/quit data-only messages on iOS
		// 			contentAvailable: true,
		// 			// Required for background/quit data-only messages on Android
		// 			priority: 'high',
		// 		},
		// 	);
		// }
	} catch (e) {
		console.log(e);
	}
}
function ChatController(socket) {
	console.log('a user connected');
	socket.on('set_online', function({ id, type }) {
		console.log(id, ' set online with socket ', socket.id);
		setChatSocket(id, type, socket.id);
		socket.soketid = id;
		socket.userType = type;
		const conversations = getConversations(id, type);
		conversations
			.then((conversations) => {
				console.log(conversations);
				socket.emit('fetch_conversations', conversations);
			})
			.catch((e) => {
				console.log(e);
			});
	});

	socket.on('disconnect', function() {
		console.log('disconnected');
		deleteChatSocket(socket.soketid, socket.userType);
	});

	socket.on('send_message', function({
		from,
		to,
		message,
		toType,
		fromType,
	}) {
		sendMessage(to, message, from, toType, fromType, socket);
		// clearConvo(to);
		// clearConvo(from);
	});
	socket.on('call-user', function(data) {
		handleCallUser(data, socket);
	});
	socket.on('make-answer', (data) => {
		console.log('make-answer received with ', data);
		socket.to(data.to).emit('answer-made', {
			socketFrom: socket.id,
			answer: data.answer,
		});
	});
	socket.on('icecandidate', async function({ candidate, type, to }) {
		try {
			const res = await getChatSocket(to, type);
			const online = res.online;
			const socketID = res.socket;
			console.log('online ', online, socketID);
			if (online) {
				console.log('emited candidateReceived to ', socketID);
				socket.to(socketID).emit('candidateReceived', {
					candidate,
				});
			}
		} catch (e) {
			console.log(e);
		}
	});
}

module.exports = ChatController;
