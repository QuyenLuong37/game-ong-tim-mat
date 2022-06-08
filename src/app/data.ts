const colors = ['#9966cc', '#31adff', '#ff4314', '#ff9900']
export const data = [
    {
        id: 1,
        name: 'Đây là nơi trưng bày các bảo bối thần kì từ đời đầu đến đời mới nhất của thế kỉ 22, Sóc Út đố bạn biết?',
        image: '/assets/img/baoboicuadoraemon_tb_1.jpg',
        choices: [
            {
                id: 1,
                name: 'Cửa hàng tương lai'
            },
            {
                id: 2,
                name: 'Bảo tàng bảo bối'
            },
            {
                id: 3,
                name: 'Sản xuất bảo bối'
            },
            {
                id: 4,
                name: 'Lâu đài giữa đảo hoang'
            },
        ],
        color: '#9966cc',
        correct: {
            // idQuestion: 1,
            idChoice: 1
        }
    },
    {
        id: 2,
        name: 'Những bảo bối của Doraemon thật tuyệt, Bun Khủng thắc mắc không biết những bảo bối đó có thật ở trong cuộc sống của chúng mình không nhỉ?',
        image: '/assets/img/baoboicuadoraemon_tb_5.jpg',
        choices: [
            {
                id: 5,
                name: 'Một số bảo bối!'
            },
            {
                id: 6,
                name: 'Làm sao có được nhỉ.'
            },
            {
                id: 7,
                name: 'Chỉ có trên mặt trăng thôi'
            },
            {
                id: 8,
                name: 'Cả A và B'
            },
        ],
        color: colors[Math.floor(Math.random()*colors.length)],
        correct: {
            // idQuestion: 2,
            idChoice: 6
        }
    },
    {
        id: 3,
        name: 'Để biến thành tàng hình, Nobita có thể mượn bảo bối nào của Doraemon nhỉ?',
        image: '/assets/img/baoboicuadoraemon_tb_4.jpg',
        choices: [
            {
                id: 9,
                name: 'Lọ thuốc mắt không ai thấy'
            },
            {
                id: 10,
                name: 'Lọ thuốc mắt không thấy ai'
            },
            {
                id: 11,
                name: 'Khăn tàng hình'
            },
            {
                id: 12,
                name: 'A và C là đáp án đúng'
            },
        ],
        color: colors[Math.floor(Math.random()*colors.length)],
        correct: {
            // idQuestion: 3,
            idChoice: 11
        }
    },
    {
        id: 4,
        name: 'Ai là người mượn bảo bối của Doraemon nhiều nhất, Sóc út đố bạn?',
        image: '/assets/img/baoboicuadoraemon_tb_2.jpg',
        choices: [
            {
                id: 13,
                name: 'Nobita'
            },
            {
                id: 14,
                name: 'Jaien'
            },
            {
                id: 15,
                name: 'Xuka'
            },
            {
                id: 16,
                name: 'Suneo'
            },
        ],
        color: colors[Math.floor(Math.random()*colors.length)],
        correct: {
            // idQuestion: 4,
            idChoice: 13
        }
    },
    {
        id: 5,
        name: 'Món bảo bối của Doraemon có thể thay đổi tuổi tác, Sóc út đố bạn?',
        image: '/assets/img/baoboicuadoraemon_tb_3.jpg',
        choices: [
            {
                id: 17,
                name: 'Đồng hồ tốc độ'
            },
            {
                id: 18,
                name: 'Tivi thời gian'
            },
            {
                id: 19,
                name: 'Máy điều chỉnh thời gian'
            },
            {
                id: 20,
                name: 'Vòng nước tuổi tác'
            },
        ],
        color: colors[Math.floor(Math.random()*colors.length)],
        correct: {
            // idQuestion: 5,
            idChoice: 20
        }
    }
]