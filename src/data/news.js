// Демонстрационные публикации. Формат подходит для будущего API и админ-панели.
// В продакшене замените эти записи проверенными материалами школы.
export const newsItems = [
  {
    id: 'welcome-school-year',
    slug: 'welcome-school-year',
    status: 'published',
    publishedAt: '2026-09-12T09:00:00+05:00',
    category: 'school',
    cover: { type: 'pattern', theme: 'school' },
    translations: {
      uz: {
        categoryLabel: 'Maktab hayoti',
        title: 'Yangi oʻquv yiliga xush kelibsiz!',
        excerpt: 'Yangi maqsadlar, yangi bilimlar va unutilmas taassurotlarga boy yil boshlandi.',
        body: [
          'Yangi oʻquv yili — yangi maqsadlar, kashfiyotlar va doʻstlar bilan uchrashuvlar davri. Maktabimiz oʻquvchilari va ustozlariga bilimga boy, mazmunli yil tilaymiz.',
          'Darslar davomida oʻquvchilarimiz oʻz qiziqishlarini rivojlantirib, jamoa bilan ishlash va yangi gʻoyalarni sinab koʻrish imkoniga ega boʻladilar.',
          'Barcha oʻquvchilar, ota-onalar va ustozlarga yangi oʻquv yilida omad va ilhom tilaymiz!'
        ]
      },
      ru: {
        categoryLabel: 'Жизнь школы',
        title: 'С новым учебным годом!',
        excerpt: 'Начался год, полный новых целей, открытий и ярких впечатлений.',
        body: [
          'Новый учебный год — это время новых целей, открытий и встреч с друзьями. Желаем ученикам и учителям нашей школы интересного и насыщенного года.',
          'На занятиях ребята смогут развивать свои интересы, учиться работать в команде и пробовать новые идеи.',
          'Желаем ученикам, родителям и учителям вдохновения и успехов в новом учебном году!'
        ]
      }
    }
  },
  {
    id: 'young-readers-week',
    slug: 'young-readers-week',
    status: 'published',
    publishedAt: '2026-09-08T10:00:00+05:00',
    category: 'students',
    cover: { type: 'pattern', theme: 'students' },
    translations: {
      uz: {
        categoryLabel: 'Oʻquvchilar',
        title: 'Yosh kitobxonlar haftaligi',
        excerpt: 'Oʻquvchilarimiz sevimli kitoblari bilan oʻrtoqlashib, mutolaa zavqini kashf etdilar.',
        body: [
          'Kitob oʻqish dunyoqarashni kengaytiradi, tasavvurni boyitadi va yangi fikrlarga yoʻl ochadi. Yosh kitobxonlar haftaligi davomida oʻquvchilarimiz oʻzlari sevib oʻqigan asarlar haqida suhbatlashdilar.',
          'Har bir ishtirokchi oʻziga taʼsir qilgan qahramon yoki voqeani tanishtirdi. Bunday suhbatlar kitoblarni birgalikda kashf etish va yangi asarlarni tavsiya qilish uchun yaxshi imkoniyat boʻldi.',
          'Mutolaa zavqini kundalik hayotimizda saqlab qolish va yangi kitoblarni kashf etishda davom etamiz.'
        ]
      },
      ru: {
        categoryLabel: 'Ученики',
        title: 'Неделя юных читателей',
        excerpt: 'Ученики поделились любимыми книгами и открыли для себя радость чтения.',
        body: [
          'Чтение расширяет кругозор, развивает воображение и помогает находить новые идеи. Во время недели юных читателей школьники поговорили о книгах, которые им особенно понравились.',
          'Каждый участник представил героя или событие, которое его впечатлило. Такие встречи помогают открывать книги вместе и советовать друг другу новые произведения.',
          'Будем сохранять радость чтения в повседневной жизни и продолжать знакомиться с новыми книгами.'
        ]
      }
    }
  },
  {
    id: 'knowledge-day',
    slug: 'knowledge-day',
    status: 'published',
    publishedAt: '2026-09-02T08:30:00+05:00',
    category: 'events',
    cover: { type: 'pattern', theme: 'events' },
    translations: {
      uz: {
        categoryLabel: 'Tadbirlar',
        title: 'Bilimlar kuni — yangi boshlanish',
        excerpt: 'Maktab hovlisida quvonch, tabassum va yangi uchrashuvlar bilan bayramona tadbir oʻtdi.',
        body: [
          'Bilimlar kuni — yangi oʻquv yilining quvonchli boshlanishi. Bu sana oʻquvchilar, ota-onalar va ustozlarni maktabda yana bir joyga jamlaydi.',
          'Tadbir davomida yangi oʻquvchilar maktab hayoti bilan tanishdilar, sinfdoshlar esa yozgi taʼtildan soʻng qayta uchrashdilar. Ustozlar barchaga ezgu tilaklarini bildirdilar.',
          'Yangi oʻquv yili barchamizga bilim, doʻstlik va yangi yutuqlar olib kelsin.'
        ]
      },
      ru: {
        categoryLabel: 'События',
        title: 'День знаний — время начинать',
        excerpt: 'Во дворе школы прошёл праздник с улыбками, радостными встречами и цветами.',
        body: [
          'День знаний — радостное начало нового учебного года. Этот праздник вновь собирает в школе учеников, родителей и учителей.',
          'Во время встречи новые ученики познакомились со школьной жизнью, а одноклассники увиделись после летних каникул. Учителя пожелали всем успехов.',
          'Пусть новый учебный год принесёт знания, дружбу и новые достижения.'
        ]
      }
    }
  }
]
