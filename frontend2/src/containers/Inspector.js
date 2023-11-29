import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { DebounceInput } from 'react-debounce-input';
import actionTypes from "../constants/actionTypes";
import blocks from "../views/blocks";
import './Inspector.css'
// 입력 유형을 상수로 정의합니다.
const INPUT_TYPES = {
  STRING: 'string',
  COLOR: 'color',
  BOOLEAN: 'boolean',
  SELECT: 'select'
};
const SelectInput = ({ config, blockData, onChange }) => (
  <div className='form-group'>
    <label>{config.name}</label>
    <select
      className='form-control'
      value={blockData}
      onChange={onChange}
    >
      {config.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// 문자열 입력 컴포넌트
const StringInput = ({ config, blockData, onChange }) => (
  <div className='form-group'>
    <label>{config.name}</label>
    <DebounceInput
      debounceTimeout={500}
      type='text'
      className='form-control'
      placeholder={config.name}
      value={blockData}
      onChange={onChange}
    />
  </div>
);

// 색상 입력 컴포넌트
const ColorInput = ({ config, blockData, onChange }) => (
  <div className='form-group'>
    <label>{config.name}</label>
    <DebounceInput
      debounceTimeout={500}
      type='color'
      className='form-control'
      value={blockData}
      onChange={onChange}
    />
  </div>
);

// 부울 입력 컴포넌트
const BooleanInput = ({ config, blockData, onChange }) => (
  <div className='form-check'>
    <label>
      <input
        type={'checkbox'}
        className='form-check-input'
        checked={blockData}
        onChange={onChange}
      />
      {config.name}
    </label>
  </div>
);

class Inspector extends Component {
  // 블록 데이터 변경 처리 함수
  handleChangeBlockData = (blockUuid, key, value) => {
    this.props.dispatch({
      type: actionTypes.CHANGE_BLOCK_DATA,
      blockUuid,
      key,
      value
    });
  }

  // 블록 삭제 처리 함수
  handleDeleteBlock = (blockUuid) => {
    this.props.dispatch({
      type: actionTypes.DELETE_BLOCK,
      blockUuid,
    });
  }

  // 입력 유형에 따른 렌더링 함수
  renderInput = (config, block, el) => {
    const onChange = e => this.handleChangeBlockData(block.uuid, el, e.target.value || e.target.checked);

    switch (config[el].type) {
      case INPUT_TYPES.STRING:
        return <StringInput config={config[el]} blockData={block.data[el]} onChange={onChange} />;
      case INPUT_TYPES.COLOR:
        return <ColorInput config={config[el]} blockData={block.data[el]} onChange={onChange} />;
      case INPUT_TYPES.BOOLEAN:
        return <BooleanInput config={config[el]} blockData={block.data[el]} onChange={onChange} />;
      case INPUT_TYPES.SELECT:
        return <SelectInput config={config[el]} blockData={block.data[el]} onChange={onChange} />;
      default:
        return null;
    }
  };


  render() {
    if (!this.props.display) return null;

    const { selectedBlockUuid, blocks: layoutBlocks } = this.props.layout;
    const block = layoutBlocks.find(el => el.uuid === selectedBlockUuid);

    if (!block) return <div className='text-center'>먼저 블록 섹션을 추가하고 선택해주세요</div>;

    const config = blocks[block.blockId].config;

    // 각 카테고리별 설정 키들 필터링
    const titleConfigKeys = Object.keys(config).filter(key => key.startsWith('title'));
    const taglineConfigKeys = Object.keys(config).filter(key => key.startsWith('tagline'));
    const tagfieldConfigKeys = Object.keys(config).filter(key => key.startsWith('tagfield'));
    const linkConfigKeys = Object.keys(config).filter(key => key.startsWith('link'));
    const backgroundConfigKeys = Object.keys(config).filter(key => key.startsWith('background'));
    const imageConfigKeys = Object.keys(config).filter(key => key.startsWith('image'));
    const articleTitleConfigKeys = Object.keys(config).filter(key => key.startsWith('articleTitle'));
    const textConfigKeys = Object.keys(config).filter(key => key.startsWith('text'));
    const imageConfigKeys2 = Object.keys(config).filter(key => key.startsWith('img') || key.startsWith('alt'));
    const logoConfigKeys = Object.keys(config).filter(key => key.startsWith('logo'));
    return (
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h5>검사기</h5>
          <button className='btn btn-outline-danger btn-sm' onClick={() => this.handleDeleteBlock(selectedBlockUuid)}>
            블록 삭제
          </button>
        </div>
        <hr />
        {logoConfigKeys.length > 0 && (
        <div className='settings-box'>
          <h6>Logo Configuration</h6>
          {logoConfigKeys.map(el => this.renderInput(config, block, el))}
        </div>
      )}
        {titleConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Title Configuration</h6>
            {titleConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}

        {taglineConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Tagline Configuration</h6>
            {taglineConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}
        {tagfieldConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Tagfield Configuration</h6>
            {tagfieldConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}

        {linkConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Link Configuration</h6>
            {linkConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}

        {backgroundConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Background Configuration</h6>
            {backgroundConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}
        {imageConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Image Configuration</h6>
            {imageConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}

        {articleTitleConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Article Titles</h6>
            {articleTitleConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}

        {textConfigKeys.length > 0 && (
          <div className='settings-box'>
            <h6>Article Texts</h6>
            {textConfigKeys.map(el => this.renderInput(config, block, el))}
          </div>
        )}
        {imageConfigKeys2.length > 0 && (
        <div className='settings-box'>
          <h6>Image Configuration</h6>
          {imageConfigKeys2.map(el => this.renderInput(config, block, el))}
        </div>
      )}
      </div>
    );
  }


}

Inspector.propTypes = {
  layout: PropTypes.shape({
    selectedBlockUuid: PropTypes.string,
    blocks: PropTypes.arrayOf(PropTypes.shape({
      uuid: PropTypes.string,
      blockId: PropTypes.string,
      data: PropTypes.object,
    })),
  }),
  display: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  layout: state.layout,
});

export default connect(mapStateToProps)(Inspector);
