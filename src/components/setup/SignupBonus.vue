<template>
  <div class="setupSteps" v-bind:class="{disabled: bonus_status == '0'}">
    <div class="stepHead">
      <h3>Sign Up Bonus</h3>
      <p>Reward customers for creating an account on your store</p>
      <EnableFeature v-if="bonus_status == '0'" />
      <label class="switch" for="d23">
        <input
          type="checkbox"
          name="mainSwitch"
          true-value="1"
          false-value="0"
          v-model="bonus_status"
          id="d23"
        />
        <i></i>
      </label>
    </div>
    <div class="stepBody">
      <div v-if="bonus_status == '0'" class="alert alert-warning upmarketing">
        <p class="m-0">This feature could boost your sales by 200%</p>
        <b-button size="sm" variant="outline-dark" @click.prevent="bonus_status = '1'">Undo</b-button>
      </div>
      <div class="stepWrapper">
        <form id="form-signup-bonus" class="mb-0">
          <div class="row">
            <div class="form-group fLabel col-md-6">
              <label for="welcomeBonus">Welcome Bonus Point</label>
              <input
                type="number"
                class="form-control"
                name="welcomeBonus"
                id="welcomeBonus"
                v-model.trim="welcome_bonus"
              />
              <em class="error" v-if="!$v.welcome_bonus.required">Please enter valid bonus point</em>
              <em
                class="error"
                v-if="!$v.welcome_bonus.minValue"
              >Enter a minimum value of {{$v.welcome_bonus.$params.minValue.min}}</em>
              <em
                class="error"
                v-if="!$v.welcome_bonus.maxLength"
              >Allowed maximum of {{$v.welcome_bonus.$params.maxLength.max}} digits</em>
            </div>
          </div>
          <!-- <br><h6>Welcome Note</h6>
                          <div class="row d-flex align-items-center">
                            <div class="col-md-5 pr-0">
                              <div class="btn-group btnGrpToggle btnGrpCheck">
                                <input type="checkbox" id="welcomeNoteMandate">
                                <label for="welcomeNoteMandate"class="mb-0">
                                  <span class="btn btn-outline-dark">Show</span>
                                  <span class="btn btn-outline-dark">Hidden</span>
                                </label>
                              </div>
                            </div>
                            <a href="#" class="btn btn-link sampleModalTrigger" data-img="https://picsum.photos/id/1071/640/480">Sample</a>
                          </div>
                          <div class="form-row align-items-center">
                            <div class="form-group col-md-12">
                              <label for="inputEmail4">Welcome Note</label>
                              <textarea class="form-control" name="welcomeNote" id="welcomeNote" cols="30"
                                rows="5"></textarea>
                            </div>
          </div>-->
        </form>
      </div>
    </div>
    <div class="stepFoot d-flex justify-content-end">
      <ResetBlock :handleReset="resetSettings" id="SignupBonus" />
    </div>
  </div>
</template>

<script>
import EnableFeature from "./EnableFeature.vue";
import { validationMixin } from "vuelidate";
import {
  required,
  minValue,
  requiredIf,
  maxLength
} from "vuelidate/lib/validators";
import ResetBlock from "./ResetBlock";

export default {
  name: "SignupBonus",
  props: ["data", "default", "triggerReset"],
  mixins: [validationMixin],
  components: { ResetBlock, EnableFeature },
  data: function() {
    return this.data;
  },
  methods: {
    submit() {
      this.$v.$touch();
      return !this.$v.$invalid;
    },
    resetSettings() {
      this.data.welcome_bonus = this.default.welcome_bonus;
      if (this.triggerReset) {
        setTimeout(() => {
          this.triggerReset();
        }, 500);
      }
    }
  },
  validations: {
    welcome_bonus: {
      required: requiredIf(function() {
        return this.bonus_status;
      }),
      minValue: minValue(1),
      maxLength: maxLength(6)
    }
  }
};
</script>