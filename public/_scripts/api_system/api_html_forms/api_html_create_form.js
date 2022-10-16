export let api_html_create_form = `

      <!-- input section -->
      <div class="subject-input-content">
        <input class="subject-title-name-input" type="text" name="" id="" placeholder="Type your subject title here..." />
      </div>
      <!-- ------------ -->

      <!-- checkbox to create "Getting_Started" topic page -->
      <div class="subject-checkbox-content q1">
        <input type="checkbox" id="q1" name="ck1" value="Bike" class="checkbox-input" />
        <label class="subject-ckb-label" for="q1"> Create "Getting_Started.html" topic file page along with your subject folder</label><br />
      </div>
      <div class="subject-checkbox-content q2">
        <input type="checkbox" id="q2" name="ck2" value="Bike" class="checkbox-input" />
        <label class="subject-ckb-label" for="q2"> Create another subject folder inside this subject folder</label><br />
      </div>
      <!-- ------------- -->

      <!-- image icon selection section -->
      <div class="subject-icon-selection-container">
        <div class="subject-icon-selection-content"> 
          <div class="content-wrapper">
          
          </div>
          <i class="svg reload-svg reload-svg-btn" title="refresh"></i>
          </div>
          
          <p class="icon-selection-note"> 
          - Add your preferred icon inside <a class="icons-folder-link">"_images/subject_icons/__.png"</a> folder, then click on the refresh button to see it.
          <span class="t2">Required max image size 128 x 128</span>
        </p>
       
      </div>
      <!-- ------------------------ -->
`;
