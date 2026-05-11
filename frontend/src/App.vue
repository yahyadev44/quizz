<template>

  <!-- MAIN -->
  <div class="min-h-screen relative overflow-hidden bg-[#070B1A] text-white">

    <!-- BACKGROUND GLOW -->
    <div class="absolute inset-0 overflow-hidden">

      <div
        class="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/20 blur-[120px] sm:blur-[140px] rounded-full"
      ></div>

      <div
        class="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/20 blur-[120px] sm:blur-[140px] rounded-full"
      ></div>

    </div>

    <!-- CONTENT -->
    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-5 py-5 sm:py-10">

      <!-- HEADER -->
      <div class="text-center mb-8 sm:mb-10">

        <div class="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl mb-5">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

          <span class="text-[11px] sm:text-sm tracking-widest uppercase text-blue-200">
            Smart Quiz Platform
          </span>
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
          🧠 Penambah
          <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Wawasan
          </span>
        </h1>

        <p class="text-slate-300 text-sm sm:text-lg max-w-xl mx-auto px-2">
          Uji pengetahuanmu dengan quiz modern interaktif dan koreksi realtime.
        </p>
      </div>

      <!-- SETTING -->
      <div
        v-if="!quizStarted && !showResult"
        class="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[28px] sm:rounded-[35px] p-5 sm:p-8 md:p-10 shadow-2xl"
      >

        <!-- TOP -->
        <div class="flex items-center justify-between mb-8 sm:mb-10">

          <div>
            <h2 class="text-2xl sm:text-3xl font-bold">
              Mulai Quiz
            </h2>

            <p class="text-slate-400 mt-2 text-sm sm:text-base">
              Atur quiz sesuai keinginanmu
            </p>
          </div>

          <div class="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl shadow-xl">
            🚀
          </div>

        </div>

        <div class="space-y-6 sm:space-y-7">

          <!-- MODE QUIZ -->
          <div>
            <label class="block mb-3 text-slate-300 font-medium text-sm sm:text-base">
              Mode Quiz
            </label>

            <select
              v-model="settings.mode"
              class="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base outline-none focus:border-blue-500 transition"
            >
              <option value="global">
                🌍 Quiz Global
              </option>

              <option value="indonesia">
                🇮🇩 Quiz Indonesia
              </option>
            </select>
          </div>

          <!-- JUMLAH -->
          <div>
            <label class="block mb-3 text-slate-300 font-medium text-sm sm:text-base">
              Jumlah Soal
            </label>

            <select
              v-model="settings.amount"
              class="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base outline-none focus:border-blue-500 transition"
            >
              <option value="5">5 Soal</option>
              <option value="10">10 Soal</option>
              <option value="15">15 Soal</option>
            </select>
          </div>

          <!-- KATEGORI -->
          <div>
            <label class="block mb-3 text-slate-300 font-medium text-sm sm:text-base">
              Kategori
            </label>

            <select
              v-model="settings.category"
              class="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base outline-none focus:border-blue-500 transition"
            >

              <!-- GLOBAL -->
              <template v-if="settings.mode === 'global'">

                <option value="">
                  Semua Kategori
                </option>

                <option value="9">
                  Pengetahuan Umum
                </option>

                <option value="17">
                  Sains & Alam
                </option>

                <option value="23">
                  Sejarah
                </option>

                <option value="22">
                  Geografi
                </option>

                <option value="18">
                  Komputer
                </option>

                <option value="21">
                  Olahraga
                </option>

              </template>

              <!-- INDONESIA -->
              <template v-else>

                <option value="umum">
                  🇮🇩 Umum Indonesia
                </option>

                <option value="sejarah">
                  📜 Sejarah Indonesia
                </option>

                <option value="budaya">
                  🎭 Budaya Indonesia
                </option>

                <option value="geografi">
                  🗺️ Geografi Indonesia
                </option>

                <option value="kebangsaan">
                  🛡️ Pancasila & Kebangsaan
                </option>

              </template>

            </select>
          </div>

          <!-- BUTTON -->
          <button
            @click="startQuiz"
            :disabled="loading"
            class="group relative w-full overflow-hidden rounded-2xl py-4 sm:py-5 font-bold text-base sm:text-lg transition-all duration-300"
            :class="loading
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:scale-[1.01]'"
          >

            <!-- BG -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500"></div>

            <!-- HOVER -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10"></div>

            <!-- CONTENT -->
            <div class="relative flex items-center justify-center gap-3">

              <!-- LOADING -->
              <template v-if="loading">

                <svg
                  class="animate-spin h-5 w-5 sm:h-6 sm:w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>

                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>

                <span class="text-sm sm:text-base">
                  Sedang mengambil soal...
                </span>

              </template>

              <!-- NORMAL -->
              <template v-else>

                <span>MULAI QUIZ</span>

                <span class="group-hover:translate-x-1 transition">
                  →
                </span>

              </template>

            </div>

          </button>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const questions = ref([])
const current = ref(0)
const score = ref(0)

const selected = ref(null)
const correctAnswer = ref('')

const quizStarted = ref(false)
const showResult = ref(false)

const currentQuestion = ref('')
const shuffledAnswers = ref([])

const loading = ref(false)

const settings = ref({
  amount: 10,
  category: 'umum',
  mode: 'global'
})

//
// DECODE HTML
//
const decodeHTML = (text) => {

  const txt = document.createElement('textarea')

  txt.innerHTML = text

  return txt.value
}

//
// TRANSLATE
//
const translateText = async (text) => {

  try {

    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`

    const res = await axios.get(url)

    return res.data[0]
      .map(item => item[0])
      .join('')

  } catch (err) {

    return text
  }
}

//
// START QUIZ
//
const startQuiz = async () => {

  loading.value = true

  try {

    //
    // PILIH ENDPOINT
    //
    const endpoint =
      settings.value.mode === 'global'
        ? '/api/quiz/global'
        : '/api/quiz/indonesia'

    const res = await axios.get(endpoint, {
      params: {
        amount: settings.value.amount,
        category: settings.value.category || undefined
      }
    })

    let finalQuestions = []

    //
    // GLOBAL = TRANSLATE
    //
    if (settings.value.mode === 'global') {

      finalQuestions = await Promise.all(

        res.data.results.map(async (q) => {

          const translatedQuestion =
            await translateText(
              decodeHTML(q.question)
            )

          const translatedCorrect =
            await translateText(
              decodeHTML(q.correct_answer)
            )

          const translatedIncorrect =
            await Promise.all(
              q.incorrect_answers.map(async (answer) => {
                return await translateText(
                  decodeHTML(answer)
                )
              })
            )

          return {
            question: translatedQuestion,
            correct_answer: translatedCorrect,
            incorrect_answers: translatedIncorrect
          }
        })
      )

    } else {

      //
      // INDONESIA = LANGSUNG
      //
      finalQuestions = res.data.results
    }

    questions.value = finalQuestions

    quizStarted.value = true

    loadQuestion()

  } catch (err) {

    alert('Gagal mengambil soal')

    console.log(err)

  } finally {

    loading.value = false
  }
}

//
// LOAD QUESTION
//
const loadQuestion = () => {

  selected.value = null

  const q =
    questions.value[current.value]

  correctAnswer.value =
    q.correct_answer

  currentQuestion.value =
    q.question

  const answers = [
    ...q.incorrect_answers,
    q.correct_answer
  ]

  shuffledAnswers.value =
    answers.sort(() => Math.random() - 0.5)
}

//
// SELECT ANSWER
//
const selectAnswer = (answer) => {

  if (selected.value) return

  selected.value = answer

  if (answer === correctAnswer.value) {
    score.value++
  }
}

//
// BUTTON STYLE
//
const getButtonClass = (answer) => {

  if (!selected.value) {
    return 'bg-white/5 hover:bg-white/10 border-white/10'
  }

  if (answer === correctAnswer.value) {
    return 'bg-green-500/20 border-green-400 text-green-300'
  }

  if (
    answer === selected.value &&
    answer !== correctAnswer.value
  ) {
    return 'bg-red-500/20 border-red-400 text-red-300'
  }

  return 'bg-white/5 border-white/10 opacity-50'
}

//
// NEXT QUESTION
//
const nextQuestion = () => {

  if (
    current.value <
    questions.value.length - 1
  ) {

    current.value++

    loadQuestion()

  } else {

    showResult.value = true
  }
}

//
// RESTART
//
const restart = () => {

  current.value = 0

  score.value = 0

  selected.value = null

  quizStarted.value = false

  showResult.value = false
}
</script>