<template>
  <div class="setupSteps" v-bind:class="{disabled: status == '0'}">
    <div class="stepHead">
      <h3>Referral Program</h3>
      <p>Setup refer a friend program</p>
      <EnableFeature v-if="status == '0'" />
      <label class="switch" for="d41">
        <input
          type="checkbox"
          name="mainSwitch"
          v-model="status"
          true-value="1"
          false-value="0"
          id="d41"
        />
        <i></i>
      </label>
    </div>
    <div class="stepBody">
      <div class="stepWrapper">
        <h6>Get</h6>
        <form id="form-referral-program" class="mb-0">
          <div class="row">
            <div class="col-md-12 mt-2 mb-3">
              <RadioGroup
                name="loyaltyPoints"
                :options="{
                  0: 'Fixed',
                  1: 'Percentage'
                }"
                v-model="is_rwd_points_percentage"
              ></RadioGroup>
            </div>
            <div class="referralOffer" id="referral_fixed" v-if="is_rwd_points_percentage == 0">
              <div class="d-flex">
                <div class="mt-2 mb-2 form-group fLabel col-md-5">
                  <label for>Reward points</label>
                  <input
                    type="number"
                    class="form-control"
                    id="rpRewardpoints"
                    name="rpRewardpoints"
                    v-model="referrer_reward_points"
                  />
                  <em class="error" v-if="!$v.referrer_reward_points.required">Please enter valid reward points</em>
                  <em
                    class="error"
                    v-if="!$v.referrer_reward_points.minValue"
                  >Enter a minimum value of {{$v.referrer_reward_points.$params.minValue.min}}</em>
                  <em
                    class="error"
                    v-if="!$v.referrer_reward_points.maxLength"
                  >Allowed maximum of {{$v.referrer_reward_points.$params.maxLength.max}} digits</em>
                </div>
                <div class="col-md-5 p-0 d-flex align-items-center">
                  <small>
                    When referrer
                    <br />reach referral goal
                  </small>
                </div>
              </div>
            </div>
            <div
              class="referralOffer"
              id="referral_percentage"
              v-if="is_rwd_points_percentage == 1"
            >
              <div class="d-flex row m-0">
                <div class="mt-2 mb-2 form-group fLabel col-md-5">
                  <label for>Reward Percentage</label>
                  <input
                    type="number"
                    class="form-control"
                    id="rpRewardpoints"
                    name="rpRewardpoints"
                    v-model="rwd_points_percentage"
                  />
                  <em class="error" v-if="!$v.rwd_points_percentage.required">Please enter the reward points percentage</em>
                  <em
                    class="error"
                    v-if="!$v.rwd_points_percentage.minValue"
                  >Enter a minimum value of {{$v.rwd_points_percentage.$params.minValue.min}}</em>
                  <em
                    class="error"
                    v-if="!$v.rwd_points_percentage.maxLength"
                  >Allowed maximum of {{$v.rwd_points_percentage.$params.maxLength.max}} digits</em>
                </div>
                <div class="col-md-5 p-0 d-flex align-items-center">
                  <small>
                    calculated from that
                    <br />referred order value
                  </small>
                </div>
                <div class="col-md-10 mt-2">
                  <div class="alert alert-warning d-flex align-items-center m-0" role="alert">
                    <span class="badge badge-pill badge-primary">i</span>
                    Your goal is set to 1, you will be rewarded based
                    <br />on referral count when
                    percentage is selected
                  </div>
                </div>
              </div>
            </div>
            <!-- sad -->
          </div>
          <hr class="mt-4 mb-4" />
          <!-- <h6>Goals</h6>
                          <div class="row">
                            <div class="mt-2 mb-2 form-group col-md-5">
                              <label for="">Total Numbers</label>
                              <input type="number" class="form-control" id="rpTotalGoals" name="rpTotalGoals" value="1">
                            </div>
                            <div class="col-md-12">
                              <a href="#" class="btn btn-link p-0"><small>Get no. of invited friends to
                                  purchase</small></a>
                            </div>
                          </div>
                          <hr class="mt-4 mb-4">
                          <h6>Limit Referral Rewards Per Users?</h6>
                          <div class="row">
                            <div class="col-md-12 mt-2 mb-3">
                              <div class="btn-group btnGrpToggle btnGrpCheck">
                                <input type="checkbox" checked name="limitReferral" id="limitReferral">
                                <label for="limitReferral">
                                  <span class="btn btn-outline-dark">Yes</span>
                                  <span class="btn btn-outline-dark">No</span>
                                </label>
                              </div>
                            </div>
                            <div id="limitReferralForm" class="mt-3 mb-2 form-group col-md-5">
                              <label for="">Max. Rewards</label>
                              <input type="number" class="form-control" id="rpMaxrewards" name="rpMaxrewards" value="1">
                            </div>
                          </div>
          <hr class="mt-4 mb-4">-->
          <h6>Coupon Type</h6>
          <div class="row">
            <div class="col-md-12 mt-2 mb-3">
              <div class="alert alert-warning d-flex align-items-center" role="alert">
                <span class="badge badge-pill badge-primary">i</span>
                We will create coupon automatically on your webstore
              </div>
              <RadioGroup
                name="cType"
                :options="{
                  1: 'Fixed off',
                  2: 'Percentage off',
                  3: 'Free shipping'
                }"
                v-model="realtime_coupon_type_friend"
              ></RadioGroup>
            </div>
            <div class="row col-md-12 maxCouponValue" v-if="realtime_coupon_type_friend != 3">
              <div class="form-group fLabel col-md-6">
                <div class="input-group-prepend">{{ currency }}</div>
                <label for>Max. Coupon Value</label>
                <input
                  type="number"
                  class="form-control"
                  id="rpMcv"
                  name="rpMcv"
                  v-model="realtime_coupon_value_friend"
                />
                <em class="error" v-if="!$v.realtime_coupon_value_friend.required">Please enter the Max. coupon value</em>
                <em
                  class="error"
                  v-if="!$v.realtime_coupon_value_friend.minValue"
                >Enter a minimum value of {{$v.realtime_coupon_value_friend.$params.minValue.min}}</em>
                <em
                  class="error"
                  v-if="!$v.realtime_coupon_value_friend.maxLength"
                >Allowed maximum of {{$v.realtime_coupon_value_friend.$params.maxLength.max}} digits</em>
              </div>
            </div>
            <div class="row col-md-12">
              <div class="mb-0 form-group fLabel col-md-6">
                <div class="input-group-prepend">{{ currency }}</div>
                <label for>Minimum Spend Value</label>
                <input
                  type="number"
                  class="form-control"
                  id="rpMsv"
                  name="rpMsv"
                  v-model="realtime_min_order_friend"
                />
                <em class="error" v-if="!$v.realtime_min_order_friend.required">Please enter the minimum spend value</em>
                <em
                  class="error"
                  v-if="!$v.realtime_min_order_friend.maxLength"
                >Allowed maximum of {{$v.realtime_min_order_friend.$params.maxLength.max}} digits max</em>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="stepFoot d-flex justify-content-end">
      <ResetBlock :handleReset="resetSettings" id="ReferralProgram" />
    </div>
  </div>
</template>

<script>
import EnableFeature from "./EnableFeature.vue";
import RadioGroup from "@/components/RadioGroup";
import { validationMixin } from "vuelidate";
import {
  required,
  minValue,
  requiredIf,
  maxLength
} from "vuelidate/lib/validators";
import ResetBlock from "./ResetBlock";

export default {
  name: "ReferralProgram",
  props: ["data", "currency", "default", "triggerReset"],
  mixins: [validationMixin],
  components: { RadioGroup, ResetBlock, EnableFeature },
  data: function() {
    return this.data;
  },
  methods: {
    submit() {
      this.$v.$touch();
      return !this.$v.$invalid;
    },
    resetSettings() {
      this.data.referrer_reward_points = this.default.referrer_reward_points;
      this.data.rwd_points_percentage = this.default.rwd_points_percentage;
      this.data.realtime_coupon_value_friend = this.default.realtime_coupon_value_friend;
      this.data.realtime_min_order_friend = this.default.realtime_min_order_friend;
      this.data.is_rwd_points_percentage = this.default.is_rwd_points_percentage;
      this.data.realtime_coupon_type_friend = this.default.realtime_coupon_type_friend;
      if (this.triggerReset) {
        setTimeout(() => {
          this.triggerReset();
        }, 500);
      }
    }
  },
  validations: {
    referrer_reward_points: {
      required: requiredIf(function() {
        return this.status && this.is_rwd_points_percentage == 0;
      }),
      minValue: minValue(1),
      maxLength: maxLength(5)
    },
    rwd_points_percentage: {
      required: requiredIf(function() {
        return this.status && this.is_rwd_points_percentage == 1;
      }),
      minValue: minValue(1),
      maxLength: maxLength(5)
    },
    realtime_coupon_value_friend: {
      required: requiredIf(function() {
        return this.status && this.realtime_coupon_type_friend != 3;
      }),
      minValue: minValue(1),
      maxLength: maxLength(6)
    },
    realtime_min_order_friend: {
      required: requiredIf(function() {
        return this.status;
      }),
      maxLength: maxLength(6)
    }

    // welcome_points: {
    //   required: requiredIf(function() {
    //     return this.status;
    //   }),
    //   minValue: minValue(100)
    // }
  }
};
</script>