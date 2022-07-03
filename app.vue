<template>
  <nav style="border-bottom: solid #aaa 1px">
    <a class="brand" href="/">Notepad</a>
  </nav>
  <div class="flex six center" style="margin-top: 70px">
    <div>
      <div class="card" id="index">
        <header>
          <h4>Recent Updated</h4>
        </header>
        <section>
          <ProseUl>
            <ContentList path="/" v-slot="{ list }">
              <ProseLi v-for="article in list" :key="article._path">
                <ProseA :href="article._path">{{ article.title }}</ProseA>
              </ProseLi>
            </ContentList>
          </ProseUl>
        </section>
      </div>
    </div>
    <div class="half">
      <div class="card">
        <section>
          <NuxtPage />
        </section>
      </div>
    </div>
    <div>
      <div class="card" id="profile">
        <img src="https://avatars.githubusercontent.com/u/5019902?v=4">
        <header>
          <h4>TANIGUCHI Masaya</h4>
        </header>
        <section>
          <p>
            TANIGUCHI Masaya is a Ph.D. student at JAIST.
            His research in-terests lie in the area of formal semantics
            of natural language, and programming language.
          </p>
        </section>
      </div>
    </div>
  </div>
  <div class="flex two center">
    <div>
      <div class="card">
        <section>
          <p style="text-align:center">
            Unless specified otherwise, all the code and the documentation
            on this site is in CC-BY-SA 4.0. <br/> &copy; 2022 TANIGUCHI Masaya
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
<style>
body{
  background:
    radial-gradient(black 3px, transparent 4px),
    radial-gradient(black 3px, transparent 4px),
    linear-gradient(#fff 4px, transparent 0),
    linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),
    linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),
    #fff;
  background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
  background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
}
</style>
